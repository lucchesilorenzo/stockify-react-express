import { Request, Response } from "express";
import {
  createCustomerItemsQuery,
  createCustomerQuery,
  createCustomerShipmentQuery,
  getCustomerByEmailQuery,
  getCustomersQuery,
  updateCustomerByIdQuery,
  updateCustomerShipmentStatusQuery,
} from "../lib/queries/customer-queries";
import { createActivityQuery } from "../lib/queries/dashboard-queries";
import { ActivityEssentials } from "../lib/types";
import { updateWarehouseQuantitiesQuery } from "../lib/queries/warehouse-queries";
import { updateProductQuantitiesAndStatusQuery } from "../lib/queries/product-queries";
import { Prisma } from "@prisma/client";
import {
  customerEditFormSchema,
  customerIdSchema,
  shippingFormSchema,
} from "../lib/validations/customer-validations";

// @desc    Get all customers
// @route   GET /api/customers
// @access  Protected
export async function getCustomers(req: Request, res: Response) {
  try {
    const customers = await getCustomersQuery();
    res.status(200).json(customers);
  } catch {
    res.status(500).json({ message: "Failed to get customers." });
  }
}

// @desc    Create a new shipment
// @route   POST /api/customers/shipment
// @access  Protected
export async function createCustomerShipment(req: Request, res: Response) {
  // Validation
  const validatedShipment = shippingFormSchema.safeParse(req.body);
  if (!validatedShipment.success) {
    res.status(400).json({ message: "Invalid shipment." });
    return;
  }

  // Check if customer already exists
  const customer = await getCustomerByEmailQuery(validatedShipment.data.email);

  let newCustomer;

  // If customer does not exist, create a new customer
  if (!customer) {
    const { firstName, lastName, phone, email, address, city, zipCode } =
      validatedShipment.data;

    try {
      newCustomer = await createCustomerQuery({
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        zipCode,
      });
    } catch {
      res.status(500).json({ message: "Failed to create customer." });
      return;
    }
  }

  // Create new activity if a new customer was created
  if (newCustomer) {
    const activity: ActivityEssentials = {
      activity: "CREATED",
      entity: "Customer",
      userId: req.userId,
    };

    try {
      await createActivityQuery(activity);
    } catch {
      res.status(500).json({ message: "Failed to create activity." });
      return;
    }
  }

  // Take customer ID from new customer or existing customer
  const customerId = customer?.id || newCustomer?.id;
  if (!customerId) return;

  // Create customer shipment
  try {
    const customerShipment = await createCustomerShipmentQuery({ customerId });

    // Update customer shipment status in 1 minute
    setTimeout(async () => {
      try {
        await updateCustomerShipmentStatusQuery(customerShipment.id);
      } catch {
        res
          .status(500)
          .json({ message: "Failed to update customer shipment." });
        return;
      }
    }, 60000);

    // Create items for shipment
    const customerShipmentItems = validatedShipment.data.products.map((p) => ({
      productId: p.productId,
      customerShipmentId: customerShipment.id,
      quantity: p.quantity,
    }));

    // Assign items to shipment and add to customer
    await createCustomerItemsQuery(customerShipmentItems);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({ message: "Shipment already exists." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to create shipment." });
    return;
  }

  // Decrement quantity from inventory
  const productsToUpdate = validatedShipment.data.products.map((p) => ({
    id: p.productId,
    quantity: p.quantity,
  }));

  try {
    await updateProductQuantitiesAndStatusQuery(productsToUpdate);
  } catch {
    res.status(500).json({ message: "Failed to update product quantities." });
    return;
  }

  // Decrement quantity from warehouse
  const warehousesToUpdate = validatedShipment.data.products.map((p) => ({
    warehouseId: p.warehouseId,
    quantity: p.quantity,
  }));

  try {
    await updateWarehouseQuantitiesQuery(warehousesToUpdate);
  } catch {
    res.status(500).json({ message: "Failed to update warehouse quantities." });
    return;
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "CREATED",
    entity: "Shipment",
    product: validatedShipment.data.products.map((p) => p.name).join(", "),
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(201).json({ message: "Shipment created successfully." });
}

// @desc    Update a customer
// @route   PATCH /api/customers/:customerId
// @access  Protected
export async function updateCustomer(
  req: Request<{ customerId: unknown }, {}, unknown>,
  res: Response
) {
  // TODO: Check if user is authenticated

  // Validation for customer ID
  const validatedCustomerId = customerIdSchema.safeParse(req.params.customerId);
  if (!validatedCustomerId.success) {
    res.status(400).json({ message: "Invalid customer ID." });
    return;
  }

  // Validation for customer
  const validatedCustomer = customerEditFormSchema.safeParse(req.body);
  if (!validatedCustomer.success) {
    res.status(400).json({ message: "Invalid customer." });
    return;
  }

  // Update customer
  try {
    await updateCustomerByIdQuery(
      validatedCustomerId.data,
      validatedCustomer.data
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({ message: "Customer already exists." });
        return;
      }
    }
    res.status(500).json({ message: "Failed to update customer." });
    return;
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "UPDATED",
    entity: "Customer",
    userId: req.userId,
  };

  try {
    await createActivityQuery(activity);
  } catch {
    res.status(500).json({ message: "Failed to create activity." });
    return;
  }

  res.status(200).json({ message: "Customer updated successfully." });
}
