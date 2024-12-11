import { Request, Response } from "express";
import { getWarehousesQuery } from "../lib/queries/warehouse-queries";

// @desc    Get all warehouses
// @route   GET /api/warehouses
// @access  Protected
export async function getWarehouses(req: Request, res: Response) {
  try {
    const warehouses = await getWarehousesQuery();
    res.status(200).json(warehouses);
  } catch {
    res.status(500).json({ message: "Failed to get warehouses." });
  }
}
