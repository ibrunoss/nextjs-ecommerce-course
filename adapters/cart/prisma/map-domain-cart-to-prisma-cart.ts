import { CartEntity } from "@/domain/entities/cart.entity";
import { CartDatabaseInsert } from "@/infra/db/types/cart";
import { mapDomainCartItemToPrismaCartItem } from "@/adapters/cart/prisma/map-domain-cart-item-to-prisma-cart-item";

export function mapDomainCartToPrismaCart(
  cart: CartEntity
): CartDatabaseInsert {
  return {
    items: cart.items.map((item) => mapDomainCartItemToPrismaCartItem(item)),
    itemsPrice: cart.itemsPrice.originalValue,
    sessionCartId: cart.sessionCartId,
    shippingPrice: cart.shippingPrice.originalValue,
    taxPrice: cart.taxPrice.originalValue,
    totalPrice: cart.totalPrice.originalValue,
    userId: cart.userId === "" ? null : cart.userId,
  };
}
