import { Router } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import analyticsRouter from "./analyticsRouter";
import authRouter from "./authRouter";
import categoriesRouter from "./categoriesRouter";
import customersRouter from "./customersRouter";
import dashboardRouter from "./dashboardRouter";
import ordersRouter from "./ordersRouter";
import productsRouter from "./productsRouter";
import settingsRouter from "./settingsRouter";
import suppliersRouter from "./suppliersRouter";
import tasksRouter from "./tasksRouter";
import warehousesRouter from "./warehousesRouter";

const router = Router();

// Public routes
router.use("/auth", authRouter);

// Protected routes
router.use("/settings", authMiddleware, settingsRouter);
router.use("/categories", authMiddleware, categoriesRouter);
router.use("/warehouses", authMiddleware, warehousesRouter);
router.use("/dashboard", authMiddleware, dashboardRouter);
router.use("/tasks", authMiddleware, tasksRouter);
router.use("/products", authMiddleware, productsRouter);
router.use("/orders", authMiddleware, ordersRouter);
router.use("/suppliers", authMiddleware, suppliersRouter);
router.use("/customers", authMiddleware, customersRouter);
router.use("/analytics", authMiddleware, analyticsRouter);

export default router;
