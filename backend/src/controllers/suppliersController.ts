import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import {
  supplierFormSchema,
  supplierIdSchema,
  supplierRatingSchema,
} from "../lib/validations/supplier-validations";
import { ActivityEssentials } from "../lib/types";
import { createActivityQuery } from "../lib/queries/dashboard-queries";
import {
  createSupplierQuery,
  getSuppliersQuery,
  updateSupplierRatingQuery,
} from "../lib/queries/supplier-queries";

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Protected
export async function getSuppliers(req: Request, res: Response) {
  try {
    const suppliers = await getSuppliersQuery();
    res.status(200).json(suppliers);
  } catch {
    res.status(500).json({ message: "Failed to get suppliers." });
  }
}

// @desc    Create supplier
// @route   POST /api/suppliers
// @access  Protected
export async function createSupplier(
  req: Request<{}, {}, unknown>,
  res: Response
) {
  // Validation
  const validatedSupplier = supplierFormSchema.safeParse(req.body);
  if (!validatedSupplier.success) {
    res.status(400).json({ message: "Invalid supplier." });
    return;
  }

  // Create supplier
  try {
    await createSupplierQuery(validatedSupplier.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({ message: "Supplier already exists." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to create supplier." });
    return;
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "CREATED",
    entity: "Supplier",
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(201).json({ message: "Supplier created successfully." });
}

// @desc    Update supplier rating
// @route   PATCH /api/suppliers/:supplierId/rating
// @access  Protected
export async function updateSupplierRating(
  req: Request<{ supplierId: unknown }, {}, unknown>,
  res: Response
) {
  // TODO: Check if user is authenticated

  // Validation for supplier ID
  const validatedSuppliedId = supplierIdSchema.safeParse(req.params.supplierId);
  if (!validatedSuppliedId.success) {
    res.status(400).json({ message: "Invalid supplier ID." });
    return;
  }

  // Validation for rating
  const validatedRating = supplierRatingSchema.safeParse(req.body);
  if (!validatedRating.success) {
    res.status(400).json({ message: "Invalid rating." });
    return;
  }

  // Update supplier rating
  try {
    await updateSupplierRatingQuery(
      validatedSuppliedId.data,
      validatedRating.data.rating
    );
  } catch {
    res.status(500).json({ message: "Failed to update supplier rating." });
    return;
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "UPDATED",
    entity: "Supplier",
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(200).json({ message: "Supplier rating updated successfully." });
}
