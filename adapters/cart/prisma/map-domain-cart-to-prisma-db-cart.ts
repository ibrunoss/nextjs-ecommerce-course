import { CartEntity } from "@/domain/entities/cart.entity";
import { CartDatabase } from "@/infra/types/cart";
import { mapDomainCartItemToPrismaCartItem } from "@/adapters/cart/prisma/map-domain-cart-item-to-prisma-cart-item";

export function mapDomainCartToPrismaDbCart(cart: CartEntity): CartDatabase {
  return {
    id: cart.id,
    items: cart.items.map((item) => mapDomainCartItemToPrismaCartItem(item)),
    itemsPrice: cart.itemsPrice.originalValue,
    sessionCartId: cart.sessionCartId,
    shippingPrice: cart.shippingPrice.originalValue,
    taxPrice: cart.taxPrice.originalValue,
    totalPrice: cart.totalPrice.originalValue,
    userId: cart.userId === "" ? null : cart.userId,
    createdAt: cart.createdAt.date,
    updatedAt: cart.updatedAt.date,
  };
}
