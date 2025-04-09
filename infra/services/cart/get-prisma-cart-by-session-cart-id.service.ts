"use server";

import { prisma } from "@/infra/db/prisma";
import { prismaToJS } from "@/lib/utils";
import { CartDatabase, CartItemDatabase } from "@/infra/db/types/cart";

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

  return prismaToJS({
    ...data,
    items: data.items as CartItemDatabase[],
    itemsPrice: data.itemsPrice.toString(),
    shippingPrice: data.shippingPrice.toString(),
    taxPrice: data.taxPrice.toString(),
    totalPrice: data.totalPrice.toString(),
  });
}
