import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(100, "Title is too long."),
  status: z.string({
    required_error: "Status is required.",
  }),
  priority: z.string({
    required_error: "Priority is required.",
  }),
  label: z.string({
    required_error: "Label is required.",
  }),
  dueDate: z.coerce.date({
    required_error: "Due date is required.",
  }),
});

export const taskEditFormSchema = z.object({
  title: z.string().trim().max(100, "Title is too long.").optional(),
  dueDate: z.coerce.date().optional(),
});

export const taskIdSchema = z.string().cuid();

export const taskLabelSchema = z.enum([
  "INVENTORY",
  "ORDER",
  "SHIPPING",
  "QUALITY",
  "CUSTOMER",
  "MAINTENANCE",
]);

export const taskStatusSchema = z.enum([
  "BACKLOG",
  "TO_DO",
  "IN_PROGRESS",
  "DONE",
  "CANCELED",
]);

export const taskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const taskFieldAndValueSchema = z.object({
  field: z.enum(["label", "status", "priority"]),
  value: z.enum([
    "INVENTORY",
    "ORDER",
    "SHIPPING",
    "QUALITY",
    "CUSTOMER",
    "MAINTENANCE",
    "BACKLOG",
    "TO_DO",
    "IN_PROGRESS",
    "DONE",
    "CANCELED",
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),
});

export const taskGeneratorFormSchema = z.object({
  prompt: z.string().trim().min(1, "Prompt is required.").max(1000),
  numTasks: z.coerce.number().min(1, "Number of tasks is required."),
});

// Types
export type TTaskFieldAndValue = z.infer<typeof taskFieldAndValueSchema>;
export type TTaskFormSchema = z.infer<typeof taskFormSchema>;
export type TTaskEditFormSchema = z.infer<typeof taskEditFormSchema>;
export type TTaskGeneratorFormSchema = z.infer<typeof taskGeneratorFormSchema>;
