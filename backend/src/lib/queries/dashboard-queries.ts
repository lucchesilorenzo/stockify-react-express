import { ActivityEssentials } from "../types";

import prisma from "../../../prisma/prisma";

export async function getInventoryValueQuery() {
  const products = await prisma.product.findMany({
    where: {
      status: "IN_STOCK",
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
    },
    select: {
      quantity: true,
      price: true,
    },
  });

  const inventoryValue = products.reduce(
    (total, { quantity, price }) => total + quantity * price,
    0,
  );

  return inventoryValue;
}

export async function getLowStockProductsQuery() {
  const products = await prisma.product.findMany({
    where: {
      status: "IN_STOCK",
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
    },
    select: {
      quantity: true,
    },
  });

  const lowStockProducts = products.filter(
    ({ quantity }) => quantity <= 10,
  ).length;

  return lowStockProducts;
}

export async function getShippedOrdersQuery() {
  const shippedOrders = await prisma.order.count({
    where: {
      status: "SHIPPED",
    },
  });

  return shippedOrders;
}

export async function getUnitsInStockQuery() {
  const unitsInStock = await prisma.product.findMany({
    where: {
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
    },
    select: {
      quantity: true,
    },
  });

  const totalUnitsInStock = unitsInStock.reduce(
    (total, { quantity }) => total + quantity,
    0,
  );

  return totalUnitsInStock;
}

export async function getActivitiesQuery() {
  const recentActivities = await prisma.activity.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return recentActivities;
}

export async function createActivityQuery(activity: ActivityEssentials) {
  const newActivity = await prisma.activity.create({
    data: activity,
  });

  return newActivity;
}
