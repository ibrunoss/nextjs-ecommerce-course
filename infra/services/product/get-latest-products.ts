"use server";
import { PrismaClient } from "@prisma/client";

import { prismaToJS } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants/product";

export async function getLatestProducts() {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return prismaToJS(data);
}
