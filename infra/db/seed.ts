import { PrismaClient } from "@prisma/client";

import prismaSampleData from "@/infra/db/prisma-sample-data";

async function seed() {
  const prisma = new PrismaClient();

  try {
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.product.createMany({
      data: prismaSampleData.products,
    });
    await prisma.user.createMany({
      data: prismaSampleData.users,
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
  }

  await prisma.$disconnect();
}

seed();
