"use server";

import { prisma } from "@/infra/db/prisma";
import { prismaToJS } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants/product";
import { ProductDatabase } from "@/infra/db/types/product";

export async function getDatabaseLatestProducts(): Promise<ProductDatabase[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return prismaToJS(data);
}
