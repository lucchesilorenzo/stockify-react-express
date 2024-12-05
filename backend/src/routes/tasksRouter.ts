import { Router } from "express";
import {
  createTask,
  deleteTask,
  generateTasks,
  getTasks,
  updateTask,
  updateTaskField,
} from "../controllers/tasksController";

const router = Router();

router.post("/generate", generateTasks);
router.post("/", createTask);

router.patch("/:taskId/field", updateTaskField);
router.patch("/:taskId", updateTask);

router.delete("/:taskId", deleteTask);

router.get("/", getTasks);

export default router;
