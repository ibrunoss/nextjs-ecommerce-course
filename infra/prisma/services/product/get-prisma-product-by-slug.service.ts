"use server";

import { prismaToJS } from "@/lib/utils";
import { prisma } from "@/infra/prisma/db/prisma-client";
import { ProductDatabase } from "@/infra/prisma/types/product";
import { productPrismaToProductDatabaseMapper } from "../../mappers/product/product-prisma-to-product-database.mapper";

export async function getPrismaProductBySlugService(
  slug: string
): Promise<ProductDatabase | null> {
  const data = await prisma.product.findFirst({
    where: { slug },
  });

  if (!data) {
    return null;
  }

  return prismaToJS(productPrismaToProductDatabaseMapper(data));
}
