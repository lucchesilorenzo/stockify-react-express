import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { createActivityQuery } from "../lib/queries/dashboard-queries";
import {
  getAvailableProductsQuery,
  getProductByIdQuery,
  getProductBySlugQuery,
  getProductsQuery,
  getProductsToRestockQuery,
  restoreProductByIdQuery,
  updateProductByIdQuery,
  updateProductStatusByIdQuery,
} from "../lib/queries/product-queries";
import {
  decrementWarehouseQuantityQuery,
  getWarehouseQuery,
  updateWarehouseQuantityQuery,
} from "../lib/queries/warehouse-queries";
import { ActivityEssentials } from "../lib/types";
import {
  productEditFormSchema,
  productIdSchema,
  productImageSchema,
  productUpdateStatusSchema,
} from "../lib/validations/product-validations";
import axios from "axios";
import env from "../lib/env";

// @desc    Get all products
// @route   GET /api/products
export async function getProducts(req: Request, res: Response) {
  try {
    const products = await getProductsQuery();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Failed to get products." });
  }
}

// @desc    Get single product
// @route   GET /api/products/:productId
export async function getProduct(
  req: Request<{ productId: unknown }>,
  res: Response,
) {
  const validatedProductId = productIdSchema.safeParse(req.params.productId);
  if (!validatedProductId.success) {
    res.status(400).json({ message: "Invalid product ID." });
    return;
  }

  try {
    const product = await getProductByIdQuery(validatedProductId.data);
    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: "Failed to get product." });
  }
}

// @desc    Get products to restock
// @route   GET /api/products/to-restock
export async function getProductsToRestock(req: Request, res: Response) {
  try {
    const productsToRestock = await getProductsToRestockQuery();
    res.status(200).json(productsToRestock);
  } catch {
    res.status(500).json({ message: "Failed to get products." });
  }
}

// @desc    Get available products
// @route   GET /api/products/available
export async function getAvailableProducts(req: Request, res: Response) {
  try {
    const products = await getAvailableProductsQuery();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Failed to get available products." });
  }
}

// @desc    Get product by slug
// @route   GET /api/products/slug/:productSlug
export async function getProductBySlug(
  req: Request<{ productSlug: unknown }>,
  res: Response,
) {
  const validatedProductSlug = z.string().safeParse(req.params.productSlug);
  if (!validatedProductSlug.success) {
    res.status(400).json({ message: "Invalid product slug." });
    return;
  }

  try {
    const product = await getProductBySlugQuery(validatedProductSlug.data);
    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: "Failed to get product." });
  }
}

// @desc    Upload product image
// @route   POST /api/products/upload/:productId
export async function uploadProductImage(
  req: Request<{ productId: unknown }, {}, unknown>,
  res: Response,
) {
  try {
    // Validate product ID
    const validatedProductId = productIdSchema.safeParse(req.params.productId);
    if (!validatedProductId.success) {
      res.status(400).json({ message: "Invalid product ID." });
      return;
    }

    // Validate FileList (image)
    const validatedImage = productImageSchema.safeParse(req.body);
    console.log(validatedImage.data);
    if (!validatedImage.success) {
      res.status(400).json({ message: "Invalid image." });
      return;
    }

    // Destructure data
    const { image: file } = validatedImage.data;

    // Delete previous file if it exists
    const product = await getProductByIdQuery(validatedProductId.data);
    if (product && product.image && product.image !== "/placeholder.svg") {
      const filePath = path.join(process.cwd(), "public", product.image);
      await fs.rm(filePath, { force: true });
    }

    // Convert file to ArrayBuffer
    const buffer = await file.arrayBuffer();

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate random file name
    const randomFileName = randomUUID() + path.extname(file.name);

    // Write file to disk
    const filePath = path.join(uploadsDir, randomFileName);
    await fs.writeFile(filePath, Buffer.from(buffer));

    // Return file path
    res.status(200).json({ filePath: `/uploads/${randomFileName}` });
  } catch {
    res.status(500).json({ message: "Failed to upload file." });
    return;
  }

  res.status(201).json({ message: "File uploaded successfully." });
}

// @desc    Update product
// @route   PATCH /api/products/:productId
export async function updateProduct(
  req: Request<{ productId: unknown }, {}, unknown>,
  res: Response,
) {
  // TODO: Add validation

  // Check if product ID is valid
  const validatedProductId = productIdSchema.safeParse(req.params.productId);
  if (!validatedProductId.success) {
    res.status(400).json({ message: "Invalid product ID." });
    return;
  }
  // Check if product data is valid
  const validatedProduct = productEditFormSchema.safeParse(req.body);
  console.log(validatedProduct.data);
  if (!validatedProduct.success) {
    res.status(400).json({ message: "Invalid product data." });
    return;
  }

  // Check if product exists
  const productToUpdate = await getProductByIdQuery(validatedProductId.data);
  if (!productToUpdate) {
    res.status(404).json({ message: "Product not found." });
    return;
  }

  // Check if max quantity is greater or equal than current quantity
  if (!(validatedProduct.data.maxQuantity >= productToUpdate.maxQuantity)) {
    res.status(404).json({
      message:
        "New max quantity must be greater or equal than current max quantity.",
    });
    return;
  }

  // Upload image if it exists
  if (validatedProduct.data.image) {
    await axios.post(
      `${env.API_URL}/api/products/upload/${productToUpdate.id}`,
      { image: validatedProduct.data.image },
    );
  }

  // Decrement quantity of old warehouse if new warehouse is different
  if (
    validatedProduct.data.warehouseId &&
    productToUpdate.warehouseId !== validatedProduct.data.warehouseId
  ) {
    // Get new warehouse
    const warehouse = await getWarehouseQuery(
      validatedProduct.data.warehouseId,
    );
    if (!warehouse) {
      res.status(404).json({ message: "Warehouse not found." });
      return;
    }

    try {
      if (
        warehouse.quantity + productToUpdate.quantity <=
        warehouse.maxQuantity
      ) {
        // Update new warehouse first
        await updateWarehouseQuantityQuery(
          warehouse.id,
          productToUpdate.quantity,
        );

        // Decrement quantity of old warehouse
        await decrementWarehouseQuantityQuery(
          productToUpdate.warehouseId,
          productToUpdate.quantity,
        );
      } else {
        res.status(400).json({
          message: `There is not enough space in the warehouse: ${warehouse.name}.`,
        });
        return;
      }
    } catch {
      res.status(500).json({ message: "Failed to update warehouses." });
      return;
    }
  }

  // Update product
  try {
    await updateProductByIdQuery(
      validatedProductId.data,
      validatedProduct.data,
    );
  } catch {
    res.status(500).json({ message: "Failed to update product." });
    return;
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "UPDATED",
    entity: "Product",
    product: productToUpdate.name,
    userId: "cm466qyf100004ov2f62p5gm6",
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(200).json({ message: "Product updated successfully." });
}

// @desc    Update product status
// @route   PATCH /api/products/:productId/status
export async function updateProductStatus(
  req: Request<{ productId: unknown }, {}, unknown>,
  res: Response,
) {
  // TODO: Check if user is authenticated

  // Validation for product ID
  const validatedProductId = productIdSchema.safeParse(req.params.productId);
  if (!validatedProductId.success) {
    res.status(400).json({ message: "Invalid product ID." });
    return;
  }

  // Validation for product status
  const validatedProductStatus = productUpdateStatusSchema.safeParse(req.body);
  if (!validatedProductStatus.success) {
    res.status(400).json({ message: "Invalid product status." });
    return;
  }

  // Check if product exists
  const product = await getProductByIdQuery(validatedProductId.data);
  if (!product) {
    res.status(404).json({ message: "Product not found." });
    return;
  }

  // Set product status
  try {
    if (validatedProductStatus.data.status !== "ARCHIVED") {
      await updateProductStatusByIdQuery(validatedProductId.data);
    } else {
      await restoreProductByIdQuery(validatedProductId.data);
    }
  } catch {
    res.status(500).json({ message: "Failed to update product status." });
    return;
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: `${
      validatedProductStatus.data.status !== "ARCHIVED"
        ? "ARCHIVED"
        : "RESTORED"
    }`,
    entity: "Product",
    product: product.name,
    userId: "cm466qyf100004ov2f62p5gm6",
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(200).json({ message: "Product status updated successfully." });
}
