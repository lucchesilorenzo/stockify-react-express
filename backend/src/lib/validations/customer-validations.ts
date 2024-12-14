import { z } from "zod";

export const shippingFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(20, "First name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(20, "Last name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .trim()
    .max(15, "Phone number is too long."),
  address: z
    .string()
    .trim()
    .min(1, "Address is required.")
    .max(40, "Address is too long."),
  city: z
    .string()
    .trim()
    .min(1, "City is required.")
    .max(20, "City is too long."),
  zipCode: z
    .string()
    .trim()
    .min(1, "Zip Code is required.")
    .max(10, "Zip Code is too long."),
  products: z.array(
    z.object({
      productId: z.string().cuid(),
      warehouseId: z.string().cuid(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
    }),
    {
      required_error: "At least one product is required.",
    }
  ),
});

export const customerIdSchema = z.string().cuid();

export const customerEditFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(20, "First name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(20, "Last name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .trim()
    .max(15, "Phone number is too long."),
  address: z
    .string()
    .trim()
    .min(1, "Address is required.")
    .max(40, "Address is too long."),
  city: z
    .string()
    .trim()
    .min(1, "City is required.")
    .max(20, "City is too long."),
  zipCode: z
    .string()
    .trim()
    .min(1, "Zip Code is required.")
    .max(10, "Zip Code is too long."),
});

export const CSVCustomerEssentials = z.array(
  z.object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required.")
      .max(20, "First name is too long."),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required.")
      .max(20, "Last name is too long."),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Invalid email address."),
    phone: z
      .string({
        required_error: "Phone number is required.",
      })
      .trim()
      .max(15, "Phone number is too long."),
    address: z
      .string()
      .trim()
      .min(1, "Address is required.")
      .max(40, "Address is too long."),
    city: z
      .string()
      .trim()
      .min(1, "City is required.")
      .max(20, "City is too long."),
    zipCode: z
      .string()
      .trim()
      .min(1, "Zip Code is required.")
      .max(10, "Zip Code is too long."),
  })
);

// Types
export type TShippingFormSchema = z.infer<typeof shippingFormSchema>;
export type TCustomerEditFormSchema = z.infer<typeof customerEditFormSchema>;
export type TCSVCustomerEssentials = z.infer<typeof CSVCustomerEssentials>;
