import { Task } from "@prisma/client";

export type TaskWithUser = Task & {
  user: {
    firstName: string;
    lastName: string;
  };
};

export type TaskEssentials = Omit<Task, "id" | "createdAt" | "updatedAt">;

export type TaskStatus = {
  value: "BACKLOG" | "TO_DO" | "IN_PROGRESS" | "DONE" | "CANCELED";
  label: "Backlog" | "To-Do" | "In Progress" | "Done" | "Canceled";
};

export type TaskPriority = {
  value: "LOW" | "MEDIUM" | "HIGH";
  label: "Low" | "Medium" | "High";
};

export type TaskLabel = {
  value:
    | "INVENTORY"
    | "ORDER"
    | "SHIPPING"
    | "QUALITY"
    | "CUSTOMER"
    | "MAINTENANCE";
  label:
    | "Inventory"
    | "Order"
    | "Shipping"
    | "Quality"
    | "Customer"
    | "Maintenance";
};
