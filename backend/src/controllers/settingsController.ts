import { Request, Response } from "express";
import {
  getSettingsByUserIdQuery,
  updateSettingsByUserIdQuery,
} from "../lib/queries/settings-queries";
import { z } from "zod";
import { settingsFormSchema } from "../lib/validations/settings-validations";

// @desc    Get user's settings
// @route   GET /api/settings/:userId
export async function getSettingsByUserId(
  req: Request<{ userId: unknown }, {}, unknown>,
  res: Response,
) {
  // TODO: Check if user is authenticated

  const validatedUserId = z.string().cuid().safeParse(req.params.userId);
  if (!validatedUserId.success) {
    res.status(400).json({ message: "Invalid user ID." });
    return;
  }

  try {
    const settings = await getSettingsByUserIdQuery(validatedUserId.data);
    res.status(200).json(settings);
  } catch {
    res.status(500).json({ message: "Failed to get settings." });
  }
}

export async function updateSettingsByUserId(
  req: Request<{ userId: unknown }, {}, unknown>,
  res: Response,
) {
  // TODO: Check if user is authenticated
  const validatedUserId = z.string().cuid().safeParse(req.params.userId);
  if (!validatedUserId.success) {
    res.status(400).json({ message: "Invalid user ID." });
    return;
  }

  // Validation
  const validatedSettings = settingsFormSchema.safeParse(req.body);
  if (!validatedSettings.success) {
    res.status(400).json({ message: "Invalid settings." });
    return;
  }

  // Update settings
  try {
    await updateSettingsByUserIdQuery(
      validatedUserId.data,
      validatedSettings.data,
    );
  } catch {
    res.status(500).json({ message: "Failed to update settings." });
  }
}
