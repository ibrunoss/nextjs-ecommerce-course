"use server";

import { prisma } from "@/infra/prisma/db/prisma-client";
import { prismaToJS } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants/product";
import { ProductDatabase } from "@/infra/prisma/types/product";

export async function getPrismaLatestProductsService(): Promise<
  ProductDatabase[]
> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return prismaToJS(data);
}
