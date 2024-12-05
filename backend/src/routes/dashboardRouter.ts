import { Router } from "express";
import {
  getActivities,
  getInventoryValue,
  getLowStockProducts,
  getShippedOrders,
  getUnitsInStock,
} from "../controllers/dashboardController";

const router = Router();

router.get("/inventory-value", getInventoryValue);
router.get("/low-stock-products", getLowStockProducts);
router.get("/shipped-orders", getShippedOrders);
router.get("/units-in-stock", getUnitsInStock);
router.get("/activities", getActivities);

export default router;
