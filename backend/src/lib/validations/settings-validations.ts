import { z } from "zod";

export const settingsFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(20, "Name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(20, "Last name is too long."),
  dateOfBirth: z.coerce.date().optional(),
  bio: z.string().trim().max(200, "Bio is too long."),
  phone: z.string().trim().max(30, "Phone number is too long.").optional(),
  address: z.string().trim().max(20, "Address is too long."),
  city: z.string().trim().max(20, "City is too long."),
  zipCode: z.string().trim().max(10, "Zip Code is too long."),
});

// Types
export type TSettingsFormSchema = z.infer<typeof settingsFormSchema>;
