import { Supplier } from "@prisma/client";

export type SupplierWithOrderCount = Supplier & {
  _count: {
    orders: number;
  };
};
