import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { startOfMonth } from "date-fns";

import {
  activities,
  categories,
  orders,
  products,
  suppliers,
  tasks,
  warehouses,
} from "./mock-data";

const prisma = new PrismaClient();

async function main() {
  // Create warehouses
  await prisma.warehouse.createMany({
    data: warehouses,
  });

  // Create categories
  await prisma.category.createMany({
    data: categories,
  });

  // Create suppliers
  await prisma.supplier.createMany({
    data: suppliers,
  });

  // Create user
  await prisma.user.create({
    data: {
      id: "cm466qyf100004ov2f62p5gm6",
      email: "lorenzolucchesi@gmail.com",
      hashedPassword: await bcrypt.hash("test", 10),
      firstName: "Lorenzo",
      lastName: "Lucchesi",
      dateOfBirth: "1984-09-20T22:00:00.000Z",
      phone: "+393304456032",
      bio: "I'm the admin!",
      address: "123 Main St.",
      city: "San Francisco, CA",
      zipCode: "94105",
    },
  });

  // Create tasks
  await prisma.task.createMany({
    data: tasks,
  });

  // Create products
  await prisma.product.createMany({
    data: products,
  });

  // Create orders
  await prisma.order.createMany({
    data: orders,
  });

  // Create activities
  await prisma.activity.createMany({
    data: activities,
  });

  // Create monthly inventory values
  const uniqueMonths = await prisma.order.groupBy({
    by: ["createdAt"],
    _count: {
      createdAt: true,
    },
  });

  await Promise.all(
    uniqueMonths.map(async (monthGroup) => {
      const monthStart = startOfMonth(new Date(monthGroup.createdAt));
      await prisma.monthlyInventoryValue.upsert({
        where: { month: monthStart },
        update: {},
        create: {
          month: monthStart,
          totalValue: parseFloat((Math.random() * 10000 + 5000).toFixed(2)),
        },
      });
    }),
  );

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
