import { createContext } from "react";

import { Task } from "@prisma/client";

import { TTaskFieldSchema } from "@/lib/validations/task-validations";

type TaskProviderProps = {
  children: React.ReactNode;
};

type TTaskContext = {
  handleDeleteTask: (taskId: Task["id"]) => Promise<void>;
  handleUpdateTaskField: (
    taskField: TTaskFieldSchema,
    taskValue: string,
    taskId: Task["id"],
  ) => Promise<void>;
};

export const TaskContext = createContext<TTaskContext | null>(null);

export default function TaskProvider({ children }: TaskProviderProps) {
  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;
}
