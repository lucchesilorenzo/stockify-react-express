import { Router } from "express";
import {
  getSettingsByUserId,
  updateSettingsByUserId,
} from "../controllers/settingsController";

const router = Router();

router.get("/:userId", getSettingsByUserId);

router.patch("/:userId", updateSettingsByUserId);

export default router;
