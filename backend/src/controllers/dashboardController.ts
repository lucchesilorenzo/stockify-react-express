import { Request, Response } from "express";
import {
  getActivitiesQuery,
  getInventoryValueQuery,
  getLowStockProductsQuery,
  getShippedOrdersQuery,
  getUnitsInStockQuery,
} from "../lib/queries/dashboard-queries";

// @desc    Get inventory value
// @route   GET /api/dashboard/inventory-value
export async function getInventoryValue(req: Request, res: Response) {
  try {
    const inventoryValue = await getInventoryValueQuery();
    res.status(200).json(inventoryValue);
  } catch {
    res.status(500).json({ message: "Failed to get inventory value." });
  }
}

// @desc    Get low stock products
// @route   GET /api/dashboard/low-stock-products
export async function getLowStockProducts(req: Request, res: Response) {
  try {
    const lowStockProducts = await getLowStockProductsQuery();
    res.status(200).json(lowStockProducts);
  } catch {
    res.status(500).json({ message: "Failed to get low stock products." });
  }
}

// @desc    Get shipped orders
// @route   GET /api/dashboard/shipped-orders
export async function getShippedOrders(req: Request, res: Response) {
  try {
    const shippedOrders = await getShippedOrdersQuery();
    res.status(200).json(shippedOrders);
  } catch {
    res.status(500).json({ message: "Failed to get shipped orders." });
  }
}

// @desc    Get units in stock
// @route   GET /api/dashboard/units-in-stock
export async function getUnitsInStock(req: Request, res: Response) {
  try {
    const unitsInStock = await getUnitsInStockQuery();
    res.status(200).json(unitsInStock);
  } catch {
    res.status(500).json({ message: "Failed to get units in stock." });
  }
}

// @desc    Get activities
// @route   GET /api/dashboard/activities
export async function getActivities(req: Request, res: Response) {
  try {
    const activities = await getActivitiesQuery();
    res.status(200).json(activities);
  } catch {
    res.status(500).json({ message: "Failed to get activities." });
  }
}
