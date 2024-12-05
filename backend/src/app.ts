import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import errorMiddleware from "./middlewares/errorMiddleware";
import "dotenv/config";

import dashboardRouter from "./routes/dashboardRouter";
import tasksRouter from "./routes/tasksRouter";
import productsRouter from "./routes/productsRouter";
import ordersRouter from "./routes/ordersRouter";
import suppliersRouter from "./routes/suppliersRouter";
import customersRouter from "./routes/customersRouter";
import settingsRouter from "./routes/settingsRouter";
import authRouter from "./routes/authRouter";
import analyticsRouter from "./routes/analyticsRouter";
import { inventoryCronJob } from "./lib/cron";

const app = express();

inventoryCronJob();

// Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/suppliers", suppliersRouter);
app.use("/api/customers", customersRouter);
app.use("/api/analytics", analyticsRouter);

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
