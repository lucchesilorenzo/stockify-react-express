import { Task } from "@prisma/client";

import { TaskLabel, TaskPriority, TaskStatus } from "../types";
import { TaskEssentials } from "../types/task-types";
import {
  TTaskEditFormSchema,
  TTaskFieldAndValue,
} from "../validations/task-validations";

import prisma from "../../../prisma/prisma";

export async function getTasksQuery() {
  const tasks = await prisma.task.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return tasks;
}

export async function createTaskQuery(task: TaskEssentials) {
  const newTask = await prisma.task.create({
    data: task,
  });

  return newTask;
}

export async function deleteTaskByIdQuery(taskId: Task["id"]) {
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return deletedTask;
}

export async function updateTaskFieldQuery(
  taskField: TTaskFieldAndValue["field"],
  taskValue: TaskLabel["value"] | TaskStatus["value"] | TaskPriority["value"],
  taskId: Task["id"],
) {
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      [taskField]: taskValue,
    },
  });

  return updatedTask;
}

export async function updateTaskQuery(
  task: TTaskEditFormSchema,
  taskId: Task["id"],
) {
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: task,
  });

  return updatedTask;
}
