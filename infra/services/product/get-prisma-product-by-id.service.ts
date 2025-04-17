"use server";
import { prismaToJS } from "@/lib/utils";
import { prisma } from "@/infra/db/prisma";
import { ProductDatabase } from "@/infra/types/product";

export async function getPrismaProductByIdService(
  id: string
): Promise<ProductDatabase | null> {
  const data = await prisma.product.findFirst({
    where: { id },
  });
  return prismaToJS(data);
}
