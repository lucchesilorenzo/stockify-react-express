import { Order } from "@prisma/client";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";

import { OrderEssentials } from "../types";
import prisma from "../../../prisma/prisma";

export async function getOrdersQuery() {
  const orders = await prisma.order.findMany({
    include: {
      product: {
        select: {
          name: true,
        },
      },
      supplier: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return orders;
}

export async function createOrderQuery(orderDetails: OrderEssentials) {
  const newOrder = await prisma.order.create({
    data: orderDetails,
  });

  return newOrder;
}

export async function getMonthlyOrdersQuery() {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  const ordersThisMonth = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });

  return ordersThisMonth;
}

export async function getWeeklyOrdersQuery() {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });

  const ordersLastWeek = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });

  return ordersLastWeek;
}

export async function updateOrderStatusQuery(orderId: Order["id"]) {
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "DELIVERED",
    },
  });

  return updatedOrder;
}
