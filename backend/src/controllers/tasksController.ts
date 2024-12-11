import { Prisma } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";
import { Ollama } from "ollama";
import { exampleOutput, taskStructure } from "../lib/prompts";
import { createActivityQuery } from "../lib/queries/dashboard-queries";
import {
  createTaskQuery,
  deleteTaskByIdQuery,
  getTasksQuery,
  updateTaskFieldQuery,
  updateTaskQuery,
} from "../lib/queries/task-queries";
import { ActivityEssentials } from "../lib/types";
import {
  taskEditFormSchema,
  taskFieldAndValueSchema,
  taskFormSchema,
  taskGeneratorFormSchema,
  taskIdSchema,
  taskLabelSchema,
  taskPrioritySchema,
  taskStatusSchema,
} from "../lib/validations/task-validations";
import env from "../lib/env";

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Protected
export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await getTasksQuery();
    res.status(200).json(tasks);
  } catch {
    res.status(500).json({ message: "Failed to get tasks." });
  }
}

// @desc    Create a task
// @route   POST /api/tasks
// @access  Protected
export async function createTask(req: Request<{}, {}, unknown>, res: Response) {
  // Validation
  const validatedTask = taskFormSchema.safeParse(req.body);
  if (!validatedTask.success) {
    res.status(400).json({ message: "Invalid task." });
    return;
  }

  // Add user ID
  const taskWithUser = {
    ...validatedTask.data,
    userId: req.userId,
  };

  // Create task
  try {
    await createTaskQuery(taskWithUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({ message: "Task already exists." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to create task." });
    return;
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "CREATED",
    entity: "Task",
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(201).json({ message: "Task created successfully." });
}

// @desc    Generate tasks
// @route   POST /api/tasks/generate
// @access  Protected
export async function generateTasks(
  req: Request<{}, {}, unknown>,
  res: Response
) {
  const validatedPrompt = taskGeneratorFormSchema.safeParse(req.body);
  if (!validatedPrompt.success) {
    res.status(400).json({ message: "Invalid prompt." });
    return;
  }

  const numTasks = validatedPrompt.data.numTasks || 5;
  const description = validatedPrompt.data.prompt;

  const finalPrompt = `${description}. Generate ${numTasks} tasks. ${taskStructure} ${exampleOutput} Return only a pure JSON array of tasks, without extra formatting.`;

  const ollama = new Ollama();

  try {
    const res = await ollama.chat({
      model: "qwen2.5-coder:1.5b",
      messages: [
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      format: "json",
    });

    const { tasks } = JSON.parse(res.message.content);

    for (const task of tasks) {
      await axios.post(`${env.API_URL}/api/tasks`, task);
    }
  } catch {
    res.status(500).json({ message: "Failed to generate tasks." });
    return;
  }

  res.status(201).json({ message: "Tasks created successfully." });
}

// @desc    Update a task
// @route   PATCH /api/tasks/:taskId
// @access  Protected
export async function updateTask(
  req: Request<{ taskId: unknown }, {}, unknown>,
  res: Response
) {
  // Validation for task
  const validatedTask = taskEditFormSchema.safeParse(req.body);
  if (!validatedTask.success) {
    res.status(400).json({ message: "Invalid task." });
    return;
  }

  // Validation for task ID
  const validatedTaskId = taskIdSchema.safeParse(req.params.taskId);
  if (!validatedTaskId.success) {
    res.status(400).json({ message: "Invalid task ID." });
    return;
  }

  // Update task
  try {
    await updateTaskQuery(validatedTask.data, validatedTaskId.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(400).json({ message: "Task not found." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to update task." });
    return;
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "UPDATED",
    entity: "Task",
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(200).json({ message: "Task updated successfully." });
}

// @desc    Update task field
// @route   PATCH /api/tasks/:taskId/field
// @access  Protected
export async function updateTaskField(
  req: Request<{ taskId: unknown }, {}, unknown>,
  res: Response
) {
  // Validation for task field and value
  const validatedTask = taskFieldAndValueSchema.safeParse(req.body);
  if (!validatedTask.success) {
    res.status(400).json({ message: "Invalid task field." });
    return;
  }

  // Destructure task field and value
  const { field, value } = validatedTask.data;

  // Validation for taskValue
  let validatedTaskValue;

  switch (field) {
    case "label":
      validatedTaskValue = taskLabelSchema.safeParse(value);
      break;
    case "status":
      validatedTaskValue = taskStatusSchema.safeParse(value);
      break;
    case "priority":
      validatedTaskValue = taskPrioritySchema.safeParse(value);
      break;
    default:
      res.status(400).json({ message: "Invalid task field." });
      return;
  }

  if (!validatedTaskValue.success) {
    res.status(400).json({ message: "Invalid task value." });
    return;
  }

  // Validation for task ID
  const validatedTaskId = taskIdSchema.safeParse(req.params.taskId);
  if (!validatedTaskId.success) {
    res.status(400).json({ message: "Invalid task ID." });
    return;
  }

  // Update task label
  try {
    await updateTaskFieldQuery(field, value, validatedTaskId.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(400).json({ message: "Task not found." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to update task." });
    return;
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "UPDATED",
    entity: "Task",
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(200).json({ message: "Task updated successfully." });
}

// @desc    Delete a task
// @route   DELETE /api/tasks/:taskId
// @access  Protected
export async function deleteTask(req: Request, res: Response) {
  // Validation
  const validatedTaskId = taskIdSchema.safeParse(req.params.taskId);
  if (!validatedTaskId.success) {
    res.status(400).json({ message: "Invalid task ID." });
    return;
  }

  try {
    await deleteTaskByIdQuery(validatedTaskId.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).json({ message: "Task not found." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to delete task." });
    return;
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "DELETED",
    entity: "Task",
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(200).json({ message: "Task deleted successfully." });
}
