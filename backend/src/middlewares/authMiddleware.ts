import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../lib/env";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.sendStatus(403);
      return;
    }

    if (decoded && typeof decoded === "object") {
      req.userId = decoded.id;
      next();
    }
  });
}
