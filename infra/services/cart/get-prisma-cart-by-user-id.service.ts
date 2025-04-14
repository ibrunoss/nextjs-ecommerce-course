"use server";

import { prisma } from "@/infra/db/prisma";
import { transformCart } from "@/infra/db/mappers/cart/transform-cart.mapper.ts";
import { CartDatabase } from "@/infra/db/types/cart";

export async function getPrismaCartByUserIdService(
  userId: string
): Promise<CartDatabase | null> {
  const data = await prisma.cart.findFirst({
    where: {
      userId,
    },
  });

  if (!data) {
    return null;
  }

  return transformCart(data);
}
