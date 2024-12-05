import { Router } from "express";
import {
  createCustomerShipment,
  getCustomers,
  updateCustomer,
} from "../controllers/customersController";

const router = Router();

router.post("/shipment", createCustomerShipment);

router.get("/", getCustomers);

router.patch("/:customerId", updateCustomer);

export default router;
