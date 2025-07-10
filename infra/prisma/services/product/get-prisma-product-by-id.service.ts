"use server";
import { prismaToJS } from "@/lib/utils";
import { prisma } from "@/infra/prisma/db/prisma-client";
import { ProductDatabase } from "@/infra/prisma/types/product";

export async function getPrismaProductByIdService(
  id: string
): Promise<ProductDatabase | null> {
  const data = await prisma.product.findFirst({
    where: { id },
  });
  return prismaToJS(data);
}
