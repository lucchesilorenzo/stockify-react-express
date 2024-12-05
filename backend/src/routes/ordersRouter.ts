import { Router } from "express";
import {
  createOrder,
  createRestockOrder,
  getMonthlyOrders,
  getOrders,
  getWeeklyOrders,
  updateOrderStatus,
} from "../controllers/ordersController";

const router = Router();

router.get("/monthly", getMonthlyOrders);
router.get("/weekly", getWeeklyOrders);
router.get("/", getOrders);

router.post("/restock", createRestockOrder);
router.post("/", createOrder);

router.patch("/:orderId/status", updateOrderStatus);

export default router;
