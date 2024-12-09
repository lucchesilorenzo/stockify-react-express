import { Prisma, Product } from "@stockify/backend/types";

export type ProductWithCategoryAndWarehouse = Prisma.ProductGetPayload<{
  include: {
    category: {
      select: {
        name: true;
      };
    };
    warehouse: {
      select: {
        name: true;
      };
    };
  };
}>;

export type ProductEssentials = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "status" | "description" | "image"
>;

export type ProductStatus = {
  value: "IN_STOCK" | "OUT_OF_STOCK" | "ARCHIVED";
  label: "In Stock" | "Out of Stock" | "Archived";
};
