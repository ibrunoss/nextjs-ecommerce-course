import { cartPrismaToCartDatabaseMapper } from "@/infra/mappers/cart/cart-prisma-to-cart-database.mapper.ts";
import { prisma } from "@/infra/db/prisma";
import { CartDatabase, CartDatabaseInsert } from "@/infra/types/cart";

export async function createPrismaCartService(
  cart: CartDatabaseInsert
): Promise<CartDatabase> {
  const resp = await prisma.cart.create({ data: cart });

  return cartPrismaToCartDatabaseMapper(resp);
}
