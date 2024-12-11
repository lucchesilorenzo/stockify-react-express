import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import {
  createUserQuery,
  getUserByEmailQuery,
} from "../lib/queries/auth-queries";
import { logInSchema, signUpSchema } from "../lib/validations/auth-validations";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../lib/env";

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
export async function signUp(req: Request<{}, {}, unknown>, res: Response) {
  // Validation
  const validatedUser = signUpSchema.safeParse(req.body);
  if (!validatedUser.success) {
    res.status(400).json({ message: "Invalid user data." });
    return;
  }

  // Hash password
  const password = await bcrypt.hash(validatedUser.data.password, 10);

  // Create user
  try {
    const newUser = {
      firstName: validatedUser.data.firstName,
      lastName: validatedUser.data.lastName,
      email: validatedUser.data.email,
      hashedPassword: password,
    };

    const user = await createUserQuery(newUser);

    // Create token
    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({ message: "User already exists." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to create user." });
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export async function logIn(req: Request<{}, {}, unknown>, res: Response) {
  // Validation
  const validatedUser = logInSchema.safeParse(req.body);
  if (!validatedUser.success) {
    res.status(400).json({ message: "Invalid user data." });
    return;
  }

  try {
    // Check if user exists
    const user = await getUserByEmailQuery(validatedUser.data.email);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // Check password
    const passwordsMatch = await bcrypt.compare(
      validatedUser.data.password,
      user.hashedPassword
    );
    if (!passwordsMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // Create token
    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch {
    res.status(500).json({ message: "Failed to log in." });
  }
}
