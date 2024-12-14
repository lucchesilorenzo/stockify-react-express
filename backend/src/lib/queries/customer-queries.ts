import { Customer, CustomerShipment } from "@prisma/client";

import { CustomerEssentials, CustomerShipmentEssentials } from "../types";

import prisma from "../prisma";

export async function getCustomersQuery() {
  const customers = await prisma.customer.findMany({
    include: {
      customerShipments: {
        include: {
          shipmentItems: {
            include: {
              product: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return customers;
}

export async function getCustomerByEmailQuery(
  email: CustomerEssentials["email"]
) {
  const customer = await prisma.customer.findUnique({
    where: {
      email,
    },
  });

  return customer;
}

export async function createCustomerQuery(customer: CustomerEssentials) {
  const newCustomer = await prisma.customer.create({
    data: customer,
  });

  return newCustomer;
}

export async function createCustomersQuery(customers: CustomerEssentials[]) {
  const newCustomers = await prisma.customer.createMany({
    data: customers,
  });

  return newCustomers;
}

export async function createCustomerShipmentQuery(
  shipment: CustomerShipmentEssentials
) {
  const newCustomerShipment = await prisma.customerShipment.create({
    data: shipment,
  });

  return newCustomerShipment;
}

export async function createCustomerItemsQuery(
  items: { productId: string; customerShipmentId: string; quantity: number }[]
) {
  const newCustomerItems = await prisma.shipmentItem.createMany({
    data: items,
  });

  return newCustomerItems;
}

export async function updateCustomerShipmentStatusQuery(
  customerShipmentId: CustomerShipment["id"]
) {
  const updatedCustomerShipment = await prisma.customerShipment.update({
    where: {
      id: customerShipmentId,
    },
    data: {
      status: "DELIVERED",
    },
  });

  return updatedCustomerShipment;
}

export async function updateCustomerByIdQuery(
  customerId: Customer["id"],
  customer: CustomerEssentials
) {
  const updatedCustomer = await prisma.customer.update({
    where: {
      id: customerId,
    },
    data: customer,
  });

  return updatedCustomer;
}
