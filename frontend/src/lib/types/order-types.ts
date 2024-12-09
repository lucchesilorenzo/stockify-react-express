import { Order, Prisma } from "@stockify/backend/types";

export type OrderEssentials = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "status"
>;

export type OrderType = {
  value: "NEW" | "RESTOCK";
  label: "New Orders" | "Restock Orders";
};

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

export type OrderStatus = {
  value: "SHIPPED" | "DELIVERED";
  label: "Shipped" | "Delivered";
};
