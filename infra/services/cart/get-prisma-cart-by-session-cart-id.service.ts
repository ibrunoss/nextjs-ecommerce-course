"use server";

import { prisma } from "@/infra/db/prisma";
import { CartDatabase } from "@/infra/db/types/cart";
import { transformCart } from "@/infra/db/mappers/cart/transform-cart.mapper.ts";

export async function getPrismaCartBySessionCartIdService(
  sessionCartId: string
): Promise<CartDatabase | null> {
  const data = await prisma.cart.findFirst({
    where: {
      sessionCartId,
    },
  });

  if (!data) {
    return null;
  }

  return transformCart(data);
}
