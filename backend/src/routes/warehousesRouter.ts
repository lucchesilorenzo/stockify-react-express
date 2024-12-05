import { Router } from "express";

import { getWarehouses } from "../controllers/warehousesController";

const router = Router();

router.get("/", getWarehouses);

export default router;
