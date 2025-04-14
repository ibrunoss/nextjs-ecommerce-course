import { Prisma } from "@prisma/client";

import { prismaToJS } from "@/lib/utils";
import { CartDatabase, CartItemDatabase } from "@/infra/db/types/cart";

type PrismaCart = Prisma.CartGetPayload<Prisma.CartDefaultArgs>;

export function transformCart(cart: PrismaCart): CartDatabase {
  return prismaToJS({
    ...cart,
    items: cart.items as CartItemDatabase[],
    itemsPrice: cart.itemsPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
  });
}
