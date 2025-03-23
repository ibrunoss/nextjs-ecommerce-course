"use server";

import { prismaToJS } from "@/lib/utils";
import { prisma } from "@/infra/db/prisma";
import { ProductDatabase } from "@/infra/db/types/product";

export async function getDatabaseProductBySlug(
  slug: string
): Promise<ProductDatabase | null> {
  const data = await prisma.product.findFirst({
    where: { slug },
  });
  return prismaToJS(data);
}
