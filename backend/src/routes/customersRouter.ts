import { Router } from "express";
import {
  createCustomers,
  createCustomerShipment,
  getCustomers,
  updateCustomer,
} from "../controllers/customersController";

const router = Router();

router.post("/shipment", createCustomerShipment);
router.post("/", createCustomers);

router.get("/", getCustomers);

router.patch("/:customerId", updateCustomer);

export default router;
