import { Supplier } from "@stockify/backend/types";

export type SupplierWithOrderCount = Supplier & {
  _count: {
    orders: number;
  };
};
