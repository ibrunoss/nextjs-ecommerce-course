import { PrismaClient } from "@prisma/client";

import sampleData from "./sample-data";

async function seed() {
  const prisma = new PrismaClient();

  try {
    await prisma.product.deleteMany();
    await prisma.product.createMany({
      data: sampleData.products,
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
  }

  await prisma.$disconnect();
}

seed();
