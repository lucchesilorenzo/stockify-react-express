import { Prisma } from "@prisma/client";

export type Order = {
  id: string;
  type: string;
  product: {
    name: string;
  };
  quantity: number;
  supplier: {
    name: string;
  };
  status: string;
  totalPrice: number;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
};

export type OrderEssentials = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "status"
>;

export type DetailedOrder = Prisma.OrderGetPayload<{
  include: {
    product: {
      select: {
        name: true;
      };
    };
    supplier: {
      select: {
        name: true;
      };
    };
    user: {
      select: {
        firstName: true;
        lastName: true;
      };
    };
  };
}>;

export type OrderType = {
  value: "NEW" | "RESTOCK";
  label: "New Orders" | "Restock Orders";
};

export type OrderStatus = {
  value: "SHIPPED" | "DELIVERED";
  label: "Shipped" | "Delivered";
};
