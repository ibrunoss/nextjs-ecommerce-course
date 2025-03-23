"use server";

import { prismaToJS } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants/product";
import { prisma } from "@/infra/db/prisma";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return prismaToJS(data);
}
