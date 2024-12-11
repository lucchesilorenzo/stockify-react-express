import { Request, Response } from "express";
import {
  createOrderQuery,
  getMonthlyOrdersQuery,
  getOrdersQuery,
  getWeeklyOrdersQuery,
  updateOrderStatusQuery,
} from "../lib/queries/order-queries";
import { createActivityQuery } from "../lib/queries/dashboard-queries";
import { ActivityEssentials } from "../lib/types";
import {
  getWarehouseQuery,
  updateWarehouseQuantityQuery,
} from "../lib/queries/warehouse-queries";
import { Prisma } from "@prisma/client";
import {
  createProductQuery,
  getProductByIdQuery,
  getProductOptionsQuery,
  updateProductQuantityAndStatusQuery,
} from "../lib/queries/product-queries";
import { generateSKU, generateSlug } from "../lib/utils";
import {
  orderFormSchema,
  orderIdSchema,
  restockOrderFormSchema,
} from "../lib/validations/order-validations";
import { getCategoryQuery } from "../lib/queries/category-queries";

// @desc    Get all orders
// @route   GET /api/orders
// @access  Protected
export async function getOrders(req: Request, res: Response) {
  try {
    const orders = await getOrdersQuery();
    res.status(200).json(orders);
  } catch {
    res.status(500).json({ message: "Failed to get orders." });
  }
}

// @desc    Get monthly orders
// @route   GET /api/orders/monthly
// @access  Protected
export async function getMonthlyOrders(req: Request, res: Response) {
  try {
    const monthlyOrders = await getMonthlyOrdersQuery();
    res.status(200).json(monthlyOrders);
  } catch {
    res.status(500).json({ message: "Failed to get monthly orders." });
  }
}

// @desc    Get weekly orders
// @route   GET /api/orders/weekly
// @access  Protected
export async function getWeeklyOrders(req: Request, res: Response) {
  try {
    const weeklyOrders = await getWeeklyOrdersQuery();
    res.status(200).json(weeklyOrders);
  } catch {
    res.status(500).json({ message: "Failed to get weekly orders." });
  }
}

// @desc    Create order
// @route   POST /api/orders
// @access  Protected
export async function createOrder(
  req: Request<{}, {}, unknown>,
  res: Response
) {
  // Validation
  const validatedOrder = orderFormSchema.safeParse(req.body);
  if (!validatedOrder.success) {
    res.status(400).json({ message: "Invalid order data." });
    return;
  }

  // Check if there is enough space in the warehouse
  const warehouse = await getWarehouseQuery(validatedOrder.data.warehouseId);
  if (!warehouse) {
    res.status(404).json({ message: "Warehouse not found." });
    return;
  }

  if (
    validatedOrder.data.quantity + warehouse.quantity >
    warehouse.maxQuantity
  ) {
    res.status(400).json({
      message: `There is not enough space in the warehouse: ${warehouse.name}.`,
    });
    return;
  }

  // Get category
  const category = await getCategoryQuery(validatedOrder.data.categoryId);
  if (!category) {
    res.status(404).json({ message: "Category not found." });
    return;
  }

  // Destructure order data
  const { supplierId, ...productData } = validatedOrder.data;

  // Generate SKU and slug
  const sku = generateSKU({
    category: category.name,
    name: validatedOrder.data.name,
  });
  const slug = generateSlug(validatedOrder.data.name);

  // Create a new product
  const newProduct = { ...productData, sku, slug };

  let product;

  try {
    product = await createProductQuery(newProduct);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({ message: "Product already exists." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to create product." });
    return;
  }

  // Calculate order details
  const subtotal = validatedOrder.data.quantity * product.price;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = Number((subtotal * (category.taxRate / 100)).toFixed(2));
  const totalPrice = Number((subtotal + shipping + tax).toFixed(2));

  const orderDetails = {
    productId: product.id,
    supplierId,
    userId: req.userId,
    type: "NEW",
    quantity: validatedOrder.data.quantity,
    subtotal,
    shipping,
    tax,
    totalPrice,
  };

  // Create a new order
  try {
    await createOrderQuery(orderDetails);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({ message: "Order already exists." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to create order." });
    return;
  }

  // Update warehouse quantity
  try {
    await updateWarehouseQuantityQuery(
      warehouse.id,
      validatedOrder.data.quantity
    );
  } catch {
    res.status(500).json({ message: "Failed to update warehouse quantity." });
    return;
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "CREATED",
    entity: "Order",
    product: validatedOrder.data.name,
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(201).json({ message: "Order created successfully." });
}

// @desc    Create restock order
// @route   POST /api/orders/restock
export async function createRestockOrder(
  req: Request<{}, {}, unknown>,
  res: Response
) {
  // TODO: Check if user is authenticated

  // Validation
  const validatedRestockOrder = restockOrderFormSchema.safeParse(req.body);
  if (!validatedRestockOrder.success) {
    res.status(400).json({ message: "Invalid restock order data." });
    return;
  }

  // Check if product exists
  const product = await getProductByIdQuery(
    validatedRestockOrder.data.productId
  );
  if (!product) {
    res.status(404).json({ message: "Product not found." });
    return;
  }

  // Check if quantity is present
  const options = await getProductOptionsQuery(
    validatedRestockOrder.data.productId
  );
  if (!options) {
    res.status(404).json({ message: "Product options not found." });
    return;
  }

  // Check if there is enough space in the warehouse
  const warehouse = await getWarehouseQuery(product.warehouseId);
  if (!warehouse) {
    res.status(404).json({ message: "Warehouse not found." });
    return;
  }

  if (
    validatedRestockOrder.data.quantity + warehouse.quantity >
    warehouse.maxQuantity
  ) {
    res.status(400).json({
      message: `There is not enough space in the warehouse: ${warehouse.name}.`,
    });
    return;
  }

  // Get category
  const category = await getCategoryQuery(product.categoryId);
  if (!category) {
    res.status(404).json({ message: "Category not found." });
    return;
  }

  // Check if quantity is valid
  const orderedQuantity = validatedRestockOrder.data.quantity;
  const currentQuantity = options.quantity;
  const maxQuantity = options.maxQuantity;

  switch (true) {
    case orderedQuantity <= 0:
      res.status(400).json({
        message: "The selected quantity must be at least 1.",
      });
      return;
    case currentQuantity >= maxQuantity:
      res.status(400).json({
        message:
          "You cannot order more units of this product. The maximum quantity is already reached.",
      });
      return;
    case orderedQuantity + currentQuantity > maxQuantity:
      res.status(400).json({
        message: `The total quantity cannot exceed the maximum limit of ${maxQuantity}. Please select a quantity no greater than ${
          maxQuantity - currentQuantity
        }.`,
      });
      return;
  }

  // Calculate order details
  const subtotal = orderedQuantity * options.price;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = Number((subtotal * (category.taxRate / 100)).toFixed(2));
  const totalPrice = Number((subtotal + shipping + tax).toFixed(2));

  const orderDetails = {
    productId: validatedRestockOrder.data.productId,
    supplierId: validatedRestockOrder.data.supplierId,
    userId: req.userId,
    type: "RESTOCK",
    quantity: orderedQuantity,
    subtotal,
    shipping,
    tax,
    totalPrice,
  };

  // Create restock order
  try {
    await createOrderQuery(orderDetails);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({
          message: "Restock order already exists.",
        });
        return;
      }
    }
    res.status(500).json({ message: "Failed to create restock order." });
    return;
  }

  // Update product quantity
  try {
    await updateProductQuantityAndStatusQuery(
      validatedRestockOrder.data.productId,
      validatedRestockOrder.data.quantity
    );
  } catch {
    res.status(500).json({ message: "Failed to update product quantity." });
    return;
  }

  // Update warehouse quantity
  try {
    await updateWarehouseQuantityQuery(
      warehouse.id,
      validatedRestockOrder.data.quantity
    );
  } catch {
    res.status(500).json({ message: "Failed to update warehouse quantity." });
    return;
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "CREATED",
    entity: "Restock",
    product: product.name,
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(201).json({ message: "Restock order created successfully." });
}

// @desc    Update order status
// @route   PATCH /api/orders/:orderId/status
// @access  Protected
export async function updateOrderStatus(
  req: Request<{ orderId: unknown }>,
  res: Response
) {
  // Validation
  const validatedOrderId = orderIdSchema.safeParse(req.params.orderId);
  if (!validatedOrderId.success) {
    res.status(400).json({ message: "Invalid order ID." });
    return;
  }

  // Update order status
  try {
    await updateOrderStatusQuery(validatedOrderId.data);
  } catch {
    res.status(500).json({ message: "Failed to update order status." });
    return;
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "UPDATED",
    entity: "Order",
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(200).json({ message: "Order status updated successfully." });
}
