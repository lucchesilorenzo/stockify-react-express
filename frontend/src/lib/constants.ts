import { FormDialogActionType, ProductStatus } from "./types";

export const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export const STATUS_CONFIG: Record<
  string,
  {
    label: ProductStatus["label"];
    variant: "default" | "destructive" | "archived";
  }
> = {
  IN_STOCK: { label: "In Stock", variant: "default" },
  OUT_OF_STOCK: { label: "Out of Stock", variant: "destructive" },
  ARCHIVED: { label: "Archived", variant: "archived" },
} as const;

export const DIALOG_BTN_VARIANTS: Record<
  Exclude<FormDialogActionType, "editTask" | "generateTask">,
  {
    variant: "default" | "accent" | "outline";
    size: "sm" | "default" | "icon";
  }
> = {
  createOrder: { variant: "default", size: "default" },
  createRestockOrder: { variant: "accent", size: "default" },
  editCustomer: { variant: "outline", size: "icon" },
  addSupplier: { variant: "default", size: "default" },
  addTask: { variant: "default", size: "default" },
} as const;

export const AUTH_HEADING_TEXTS = {
  signup: {
    title: "Sign up",
    description: "Enter your credentials below to sign up to your account",
  },
  login: {
    title: "Login",
    description: "Enter your credentials below to log in to your account",
  },
} as const;

export const AUTH_FOOTER_TEXTS = {
  signup: {
    title: "Already have an account?",
    description: "Login to your account",
    href: "/login",
    hrefText: "Login",
  },
  login: {
    title: "Don't have an account?",
    description: "Sign up to your account",
    href: "/signup",
    hrefText: "Sign up",
  },
} as const;
