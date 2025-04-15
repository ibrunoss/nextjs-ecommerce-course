import { prismaToJS } from "@/lib/utils";
import { CartDatabase, CartItemDatabase, CartPrisma } from "@/infra/types/cart";

export function cartPrismaToCartDatabaseMapper(cart: CartPrisma): CartDatabase {
  return prismaToJS({
    ...cart,
    items: cart.items as CartItemDatabase[],
    itemsPrice: cart.itemsPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
  });
}
