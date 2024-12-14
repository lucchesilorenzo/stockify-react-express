import { z } from "zod";

export const orderFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(20, "Name is too long."),
    categoryId: z.string({
      required_error: "Category is required.",
    }),
    vatRate: z.string({
      required_error: "VAT rate is required.",
    }),
    warehouseId: z.string({
      required_error: "Warehouse is required.",
    }),
    supplierId: z.string({
      required_error: "Supplier is required.",
    }),
    price: z.coerce
      .number({
        invalid_type_error: "Price must be a number.",
      })
      .positive("Price must be a positive number.")
      .min(1, "Price is required.")
      .max(99999, "Price is too long."),
    quantity: z.coerce
      .number({
        invalid_type_error: "Quantity must be a number.",
      })
      .int("Quantity must be an integer.")
      .positive("Quantity must be a positive number.")
      .min(1, "Quantity is required."),
    maxQuantity: z.coerce
      .number({
        invalid_type_error: "Max quantity must be a number.",
      })
      .int("Max quantity must be an integer.")
      .positive("Max quantity must be a positive number.")
      .min(1, "Max quantity is required.")
      .max(500, "Max quantity is too long."),
  })
  .refine((data) => data.quantity <= data.maxQuantity, {
    message: "Quantity must be less than or equal to Max Quantity.",
    path: ["quantity"],
  });

export const restockOrderFormSchema = z.object({
  productId: z.string({
    required_error: "Product is required.",
  }),
  supplierId: z.string({
    required_error: "Supplier is required.",
  }),
  quantity: z.coerce
    .number({
      invalid_type_error: "Quantity must be a number.",
    })
    .int("Quantity must be an integer.")
    .positive("Quantity must be a positive number.")
    .min(1, "Quantity is required."),
});

export const orderIdSchema = z.string().cuid();

// Types
export type TOrderFormSchema = z.infer<typeof orderFormSchema>;
export type TRestockOrderFormSchema = z.infer<typeof restockOrderFormSchema>;
