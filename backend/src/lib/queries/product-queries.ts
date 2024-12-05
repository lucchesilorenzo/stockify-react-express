import { Product } from "@prisma/client";

import { ProductEssentials } from "../types";

import { TProductEditFormSchema } from "../validations/product-validations";

import prisma from "../../../prisma/prisma";

export async function getProductsQuery() {
  const products = await prisma.product.findMany({
    where: {
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      warehouse: {
        select: {
          name: true,
        },
      },
    },
  });

  return products;
}

export async function getProductsToRestockQuery() {
  const productsToRestock = await prisma.product.findMany({
    where: {
      status: {
        not: "ARCHIVED",
      },
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
    },
  });

  return productsToRestock;
}

export async function getAvailableProductsQuery() {
  const availableProducts = await prisma.product.findMany({
    where: {
      status: "IN_STOCK",
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
      quantity: {
        gt: 0,
      },
    },
  });

  return availableProducts;
}

export async function getProductByIdQuery(productId: Product["id"]) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  return product;
}

export async function getProductBySlugQuery(productSlug: Product["slug"]) {
  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },
  });

  // TODO: Different from Next.js
  // if (!product) return notFound();

  return product;
}

export async function getProductOptionsQuery(productId: Product["id"]) {
  const options = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      quantity: true,
      maxQuantity: true,
      price: true,
    },
  });

  return options;
}

export async function createProductQuery(product: ProductEssentials) {
  const newProduct = await prisma.product.create({
    data: product,
  });

  return newProduct;
}

export async function updateProductByIdQuery(
  productId: Product["id"],
  product: TProductEditFormSchema,
) {
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: product,
  });
}

export async function updateProductStatusByIdQuery(productId: Product["id"]) {
  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      status: "ARCHIVED",
    },
  });

  return updatedProduct;
}

export async function restoreProductByIdQuery(productId: Product["id"]) {
  const product = await getProductByIdQuery(productId);

  if (product) {
    const restoredProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        status: product.quantity === 0 ? "OUT_OF_STOCK" : "IN_STOCK",
      },
    });

    return restoredProduct;
  }
}

export async function updateProductQuantityAndStatusQuery(
  productId: Product["id"],
  quantity: Product["quantity"],
) {
  const productToUpdate = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      quantity: {
        increment: quantity,
      },
      status: "IN_STOCK",
    },
  });

  return productToUpdate;
}

export async function updateProductQuantitiesAndStatusQuery(
  productsToUpdate: { id: Product["id"]; quantity: Product["quantity"] }[],
) {
  const updatePromises = productsToUpdate.map(async ({ id, quantity }) => {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        quantity: true,
      },
    });

    if (product && product.quantity >= quantity) {
      const newQuantity = product.quantity - quantity;

      return prisma.product.update({
        where: {
          id,
        },
        data: {
          quantity: {
            decrement: quantity,
          },
          status: newQuantity === 0 ? "OUT_OF_STOCK" : "IN_STOCK",
        },
      });
    }
  });

  const updatedProducts = await Promise.all(updatePromises);

  return updatedProducts;
}
