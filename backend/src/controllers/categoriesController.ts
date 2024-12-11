import { Request, Response } from "express";
import { getCategoriesQuery } from "../lib/queries/category-queries";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Protected
export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await getCategoriesQuery();
    res.status(200).json(categories);
  } catch {
    res.status(500).json({ message: "Failed to get categories." });
  }
}
