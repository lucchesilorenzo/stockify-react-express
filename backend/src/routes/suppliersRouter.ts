import { Router } from "express";
import {
  createSupplier,
  getSuppliers,
  updateSupplierRating,
} from "../controllers/suppliersController";

const router = Router();

router.patch("/:supplierId/rating", updateSupplierRating);

router.post("/", createSupplier);

router.get("/", getSuppliers);

export default router;
