"use server";
import { prisma } from "@/infra/db/prisma";
import { cartPrismaToCartDatabaseMapper } from "@/infra/mappers/cart/cart-prisma-to-cart-database.mapper.ts";
import { CartDatabase } from "@/infra/types/cart";

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

  return cartPrismaToCartDatabaseMapper(data);
}
