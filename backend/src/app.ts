import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { inventoryCronJob } from "./lib/cron";

import path from "path";
import env from "./lib/env";
import errorHandler from "./middlewares/errorMiddleware";
import analyticsRouter from "./routes/analyticsRouter";
import authRouter from "./routes/authRouter";
import categoriesRouter from "./routes/categoriesRouter";
import customersRouter from "./routes/customersRouter";
import dashboardRouter from "./routes/dashboardRouter";
import ordersRouter from "./routes/ordersRouter";
import productsRouter from "./routes/productsRouter";
import settingsRouter from "./routes/settingsRouter";
import suppliersRouter from "./routes/suppliersRouter";
import tasksRouter from "./routes/tasksRouter";
import warehousesRouter from "./routes/warehousesRouter";

const app = express();

inventoryCronJob();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: env.APP_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/warehouses", warehousesRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/suppliers", suppliersRouter);
app.use("/api/customers", customersRouter);
app.use("/api/analytics", analyticsRouter);

// Error middleware
app.use(errorHandler);

const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
