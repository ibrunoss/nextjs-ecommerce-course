"use server";

import { prismaToJS } from "@/lib/utils";
import { prisma } from "@/infra/db/prisma";
import { ProductDatabase } from "@/infra/db/types/product";

export async function getDatabaseProductById(
  id: string
): Promise<ProductDatabase | null> {
  const data = await prisma.product.findFirst({
    where: { id },
  });
  return prismaToJS(data);
}
