import { transformCart } from "@/infra/db/mappers/cart/transform-cart.mapper.ts";
import { prisma } from "@/infra/db/prisma";
import { CartDatabase, CartDatabaseInsert } from "@/infra/db/types/cart";

export async function createPrismaCartService(
  cart: CartDatabaseInsert
): Promise<CartDatabase> {
  const resp = await prisma.cart.create({ data: cart });

  return transformCart(resp);
}
