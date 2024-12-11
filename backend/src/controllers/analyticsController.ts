import { Request, Response } from "express";
import {
  getMonthlyInventoryValuesQuery,
  getProductsByCategoryQuery,
  getTopProductsQuery,
} from "../lib/queries/analytics-queries";

// @desc    Get products by category
// @route   GET /api/analytics/products-by-category
// @access  Protected
export async function getProductsByCategory(req: Request, res: Response) {
  try {
    const products = await getProductsByCategoryQuery();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Failed to get products." });
  }
}

// @desc    Get monthly inventory values
// @route   GET /api/analytics/monthly-inventory-values
// @access  Protected
export async function getMonthlyInventoryValues(req: Request, res: Response) {
  try {
    const monthlyInventoryValues = await getMonthlyInventoryValuesQuery();
    res.status(200).json(monthlyInventoryValues);
  } catch {
    res
      .status(500)
      .json({ message: "Failed to get monthly inventory values." });
  }
}

// @desc    Get top products
// @route   GET /api/analytics/top-products
// @access  Protected
export async function getTopProducts(req: Request, res: Response) {
  try {
    const topProducts = await getTopProductsQuery();
    res.status(200).json(topProducts);
  } catch {
    res.status(500).json({ message: "Failed to get top products." });
  }
}
