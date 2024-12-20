import { Prisma, User } from "@prisma/client";

import { ProductEssentials } from "./product-types";

export type ActivityEssentials = {
  activity: "CREATED" | "UPDATED" | "DELETED" | "ARCHIVED" | "RESTORED";
  entity:
    | "Product"
    | "Order"
    | "Restock"
    | "Shipment"
    | "Customer"
    | "Supplier"
    | "Task";
  product?: ProductEssentials["name"];
  userId: User["id"];
};

export type DashboardActivity = Prisma.ActivityGetPayload<{
  include: {
    user: {
      select: {
        firstName: true;
        lastName: true;
      };
    };
  };
}>;
