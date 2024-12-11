import { Router } from "express";
import {
  getSettingsByUserId,
  updateSettingsByUserId,
} from "../controllers/settingsController";

const router = Router();

router.get("/", getSettingsByUserId);

router.patch("/", updateSettingsByUserId);

export default router;
