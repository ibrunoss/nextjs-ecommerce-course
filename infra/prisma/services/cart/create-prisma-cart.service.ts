import { cartPrismaToCartDatabaseMapper } from "@/infra/prisma/mappers/cart/cart-prisma-to-cart-database.mapper.ts";
import { prisma } from "@/infra/prisma/db/prisma-client";
import { CartDatabase, CartDatabaseInsert } from "@/infra/prisma/types/cart";

export async function createPrismaCartService(
  cart: CartDatabaseInsert
): Promise<CartDatabase> {
  const data = {
    sessionCartId: cart.sessionCartId,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    itemsPrice: cart.itemsPrice,
    totalPrice: cart.totalPrice,
    cartItems: {},
  };

  if (cart.items.length > 0) {
    data.cartItems = {
      create: cart.items.map((item) => ({
        product: { connect: { id: item.product.id } },
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }

  const resp = await prisma.cart.create({
    data,
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return cartPrismaToCartDatabaseMapper(resp);
}
