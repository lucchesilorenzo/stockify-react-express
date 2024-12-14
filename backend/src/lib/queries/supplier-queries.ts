import { Supplier } from "@prisma/client";

import { TSupplierFormSchema } from "../validations/supplier-validations";

import prisma from "../prisma";

export async function getSuppliersQuery() {
  const suppliers = await prisma.supplier.findMany({
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  return suppliers;
}

export async function createSupplierQuery(supplier: TSupplierFormSchema) {
  const newSupplier = await prisma.supplier.create({
    data: supplier,
  });

  return newSupplier;
}

export async function updateSupplierRatingQuery(
  supplierId: Supplier["id"],
  rating: Supplier["rating"]
) {
  const updatedSupplier = await prisma.supplier.update({
    where: {
      id: supplierId,
    },
    data: {
      rating,
    },
  });

  return updatedSupplier;
}
