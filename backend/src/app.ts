import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mainRouter from "./routes/mainRouter";
import path from "path";
import env from "./lib/env";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";

import { inventoryCronJob } from "./lib/cron";

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

// Route for static files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/api", mainRouter);

// Error middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
