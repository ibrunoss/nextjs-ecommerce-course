"use server";
import { prisma } from "@/infra/db/prisma";
import { cartPrismaToCartDatabaseMapper } from "@/infra/mappers/cart/cart-prisma-to-cart-database.mapper.ts";
import { CartDatabase } from "@/infra/types/cart";

export async function getPrismaCartByUserIdService(
  userId: string
): Promise<CartDatabase | null> {
  const data = await prisma.cart.findFirst({
    where: {
      userId, // Aqui, usamos o userId para buscar o carrinho
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
