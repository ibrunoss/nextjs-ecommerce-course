"use server";
import { prisma } from "@/infra/prisma/db/prisma-client";
import { CartDatabase } from "@/infra/prisma/types/cart";
import { cartPrismaToCartDatabaseMapper } from "@/infra/prisma/mappers/cart/cart-prisma-to-cart-database.mapper.ts";

export async function getPrismaCartBySessionCartIdService(
  sessionCartId: string
): Promise<CartDatabase | null> {
  const data = await prisma.cart.findFirst({
    where: {
      sessionCartId, // Aqui, usamos o sessionCartId para buscar o carrinho
    },
    include: {
      cartItems: {
        include: {
          product: true, // Inclui as informações do produto relacionadas ao CartItem
        },
      },
    },
  });

  if (!data) {
    return null;
  }

  return cartPrismaToCartDatabaseMapper(data);
}
