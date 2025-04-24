import { prismaToJS } from "@/lib/utils";
import { CartDatabase, CartPrisma } from "@/infra/types/cart";
import { cartItemPrismaToCartItemDatabaseMapper } from "@/infra/mappers/cart/cart-item-prisma-to-cart-item-database";

export function cartPrismaToCartDatabaseMapper(cart: CartPrisma): CartDatabase {
  return prismaToJS({
    ...cart,
    items: cart.cartItems.map(cartItemPrismaToCartItemDatabaseMapper),
    itemsPrice: cart.itemsPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
  });
}
