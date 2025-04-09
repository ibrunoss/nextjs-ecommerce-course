import { prisma } from "@/infra/db/prisma";
import {
  CartDatabase,
  CartDatabaseInsert,
  CartItemDatabase,
} from "@/infra/db/types/cart";
import { prismaToJS } from "@/lib/utils";

export async function createPrismaCartService(
  cart: CartDatabaseInsert
): Promise<CartDatabase> {
  const resp = await prisma.cart.create({ data: cart });

  return prismaToJS({
    ...resp,
    items: resp.items as CartItemDatabase[],
    itemsPrice: resp.itemsPrice.toString(),
    shippingPrice: resp.shippingPrice.toString(),
    taxPrice: resp.taxPrice.toString(),
    totalPrice: resp.totalPrice.toString(),
  });
}
