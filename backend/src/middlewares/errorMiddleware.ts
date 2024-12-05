import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(500).json({ message: "Internal Server Error" });
}
