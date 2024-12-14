import { format, startOfMonth } from "date-fns";

import { COLORS } from "../constants";
import prisma from "../prisma";

export async function getProductsByCategoryQuery() {
  // Get products grouped by category
  const productsByCategory = await prisma.category.findMany({
    include: {
      products: {
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
      },
    },
  });

  // Map products by category, returning category name, number of products units and color
  const pieChartData = productsByCategory.map((category, index) => ({
    category: category.name,
    units: category.products.reduce(
      (total, product) => total + product.quantity,
      0
    ),
    fill: `hsl(${COLORS[index % COLORS.length]}`,
  }));

  // Take pieChartData and return pieChartConfig with category name and color
  const pieChartConfig = pieChartData.reduce((config, data) => {
    config[data.category] = {
      label: data.category,
      color: data.fill,
    };

    return config;
  }, {} as Record<string, { label: string; color: string }>);

  return { pieChartData, pieChartConfig };
}

export async function updateCurrentMonthInventoryValueQuery() {
  const inventoryData = await prisma.product.findMany({
    where: {
      status: "IN_STOCK",
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
    },
    select: {
      price: true,
      quantity: true,
    },
  });

  const totalValue = inventoryData.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  );

  const currentMonth = startOfMonth(new Date());

  await prisma.monthlyInventoryValue.upsert({
    where: {
      month: currentMonth,
    },
    update: {
      totalValue,
    },
    create: {
      month: currentMonth,
      totalValue,
    },
  });
}

export async function getMonthlyInventoryValuesQuery() {
  const inventoryData = await prisma.monthlyInventoryValue.findMany({
    orderBy: {
      month: "asc",
    },
  });

  const lineChartData = inventoryData.map(({ month, totalValue }) => ({
    month: format(month, "MMMM"),
    value: totalValue,
  }));

  return lineChartData;
}

export async function getTopProductsQuery() {
  const products = await prisma.product.findMany({
    where: {
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
      status: "IN_STOCK",
    },
    select: {
      name: true,
      quantity: true,
      price: true,
    },
  });

  // Get top 5 products
  const topProducts = products
    .map(({ name, quantity, price }) => ({
      product: name,
      value: quantity * price,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return topProducts;
}
