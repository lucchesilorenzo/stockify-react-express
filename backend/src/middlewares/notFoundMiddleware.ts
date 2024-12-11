import { Request, Response, NextFunction } from "express";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).json({
    error: "Not Found",
    message: `The requested resource '${req.originalUrl}' was not found on this server.`,
  });
}
