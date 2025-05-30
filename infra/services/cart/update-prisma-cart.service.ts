import { cartPrismaToCartDatabaseMapper } from "@/infra/mappers/cart/cart-prisma-to-cart-database.mapper.ts";
import { prisma } from "@/infra/db/prisma";
import { CartDatabase } from "@/infra/types/cart";

export async function updatePrismaCartService(
  cart: CartDatabase
): Promise<CartDatabase> {
  const resp = await prisma.cart.update({ data: cart, where: { id: cart.id } });

  return cartPrismaToCartDatabaseMapper(resp);
}
