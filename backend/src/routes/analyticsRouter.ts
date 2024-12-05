import { Router } from "express";
import {
  getMonthlyInventoryValues,
  getProductsByCategory,
  getTopProducts,
} from "../controllers/analyticsController";

const router = Router();

router.get("/products-by-category", getProductsByCategory);
router.get("/monthly-inventory-values", getMonthlyInventoryValues);
router.get("/top-products", getTopProducts);

export default router;
