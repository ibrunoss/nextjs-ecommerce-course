import { cartPrismaToCartDatabaseMapper } from "@/infra/mappers/cart/cart-prisma-to-cart-database.mapper.ts";
import { prisma } from "@/infra/db/prisma";
import { CartDatabase } from "@/infra/types/cart";

export async function updatePrismaCartService(
  cart: CartDatabase
): Promise<CartDatabase> {
  const cartItemsData = cart.items.map((item) => ({
    cartId: cart.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  }));

  // Deletar os CartItems existentes para garantir que os dados sejam atualizados corretamente
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  // Criar ou atualizar os CartItems no banco
  await prisma.cartItem.createMany({
    data: cartItemsData,
  });

  // Atualizar o carrinho
  const resp = await prisma.cart.update({
    where: { id: cart.id },
    data: {
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    },
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
