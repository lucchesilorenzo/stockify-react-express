import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required.")
      .max(20, "Name is too long."),
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
    password: z
      .string()
      .trim()
      .min(1, "Password is required.")
      .max(20, "Password is too long."),
    confirmPassword: z
      .string()
      .trim()
      .min(1, "Confirm password is required.")
      .max(20, "Confirm password is too long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const logInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .max(20, "Password is too long."),
});

// Types
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TLogInSchema = z.infer<typeof logInSchema>;
