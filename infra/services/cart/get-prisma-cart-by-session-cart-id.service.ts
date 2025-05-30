"use server";
import { prisma } from "@/infra/db/prisma";
import { CartDatabase } from "@/infra/types/cart";
import { cartPrismaToCartDatabaseMapper } from "@/infra/mappers/cart/cart-prisma-to-cart-database.mapper.ts";

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

  return cartPrismaToCartDatabaseMapper(data);
}
