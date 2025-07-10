"use server";

import { prisma } from "@/infra/prisma/db/prisma-client";
import { prismaToJS } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants/product";
import { ProductDatabase, ProductPrisma } from "@/infra/prisma/types/product";
import { productPrismaToProductDatabaseMapper } from "../../mappers/product/product-prisma-to-product-database.mapper";

export async function getPrismaLatestProductsService(): Promise<
  ProductDatabase[]
> {
  const data: ProductPrisma[] = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return prismaToJS(data.map(productPrismaToProductDatabaseMapper));
}
