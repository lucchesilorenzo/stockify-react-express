import { z } from "zod";

export const productIdSchema = z.string().cuid();

export const productEditFormSchema = z.object({
  description: z.string().trim().max(200, "Description is too long."),
  price: z.coerce
    .number({
      invalid_type_error: "Price must be a number.",
    })
    .positive("Price must be a positive number.")
    .max(99999, "Price is too long."),
  maxQuantity: z.coerce
    .number({
      invalid_type_error: "Max quantity must be a number.",
    })
    .int("Max quantity must be an integer.")
    .positive("Max quantity must be a positive number.")
    .max(500, "Max quantity is too long."),
  categoryId: z.string().optional(),
  image: z.any().optional(),
  warehouseId: z.string().optional(),
});

export const productImageSchema = z.object({
  image: z.instanceof(File),
});

export const productUpdateStatusSchema = z.enum([
  "IN_STOCK",
  "OUT_OF_STOCK",
  "ARCHIVED",
]);

// Types
export type TProductEditFormSchema = z.infer<typeof productEditFormSchema>;
