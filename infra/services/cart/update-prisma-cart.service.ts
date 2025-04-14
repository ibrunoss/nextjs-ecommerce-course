import { transformCart } from "@/infra/db/mappers/cart/transform-cart.mapper.ts";
import { prisma } from "@/infra/db/prisma";
import { CartDatabase } from "@/infra/db/types/cart";

export async function updatePrismaCartService(
  cart: CartDatabase
): Promise<CartDatabase> {
  const resp = await prisma.cart.update({ data: cart, where: { id: cart.id } });

  return transformCart(resp);
}
