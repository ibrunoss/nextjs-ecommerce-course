import { CartEntity } from "@/domain/entities/cart.entities";
import { CartDatabaseInsert } from "@/infra/db/types/cart";
import { mapDomainCartItemToDatabaseCartItem } from "@/adapters/cart/database/map-domain-cart-item-to-database-cart-item";

export function mapDomainCartToDatabaseCart(
  cart: CartEntity
): CartDatabaseInsert {
  return {
    items: cart.items.map((item) => mapDomainCartItemToDatabaseCartItem(item)),
    itemsPrice: cart.itemsPrice.originalValue,
    sessionCartId: cart.sessionCartId,
    shippingPrice: cart.shippingPrice.originalValue,
    taxPrice: cart.taxPrice.originalValue,
    totalPrice: cart.totalPrice.originalValue,
    userId: cart.userId === "" ? null : cart.userId,
  };
}
