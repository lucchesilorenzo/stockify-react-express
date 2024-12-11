import { Request, Response, NextFunction } from "express";
import env from "../lib/env";

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any*/
export default function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(error.status || 500).json({
    error: "Internal Server Error",
    message:
      env.NODE_ENV === "development"
        ? error.stack
        : "An unexpected error occurred.",
  });
}
