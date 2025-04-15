import { CartEntity } from "@/domain/entities/cart.entity";
import { CartDatabaseInsert } from "@/infra/types/cart";
import { cartItemEntityToCartItemDatabaseMapper } from "@/infra/mappers/cart/cart-item-entity-to-cart-item-database.mapper";

export function cartEntityToCartDatabaseInsertMapper(
  cart: CartEntity
): CartDatabaseInsert {
  return {
    items: cart.items.map((item) =>
      cartItemEntityToCartItemDatabaseMapper(item)
    ),
    itemsPrice: cart.itemsPrice.originalValue,
    sessionCartId: cart.sessionCartId,
    shippingPrice: cart.shippingPrice.originalValue,
    taxPrice: cart.taxPrice.originalValue,
    totalPrice: cart.totalPrice.originalValue,
    userId: cart.userId === "" ? null : cart.userId,
  };
}
