import { Category } from "@prisma/client";

import prisma from "../../../prisma/prisma";

export async function getCategoriesQuery() {
  const categories = await prisma.category.findMany();

  return categories;
}

export async function getCategoryQuery(categoryId: Category["id"]) {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return category;
}
