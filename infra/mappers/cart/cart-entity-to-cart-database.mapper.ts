import { CartEntity } from "@/domain/entities/cart.entity";
import { CartDatabase } from "@/infra/types/cart";
import { cartItemEntityToCartItemDatabaseMapper } from "@/infra/mappers/cart/cart-item-entity-to-cart-item-database.mapper";

export function cartEntityToCartDatabaseMapper(cart: CartEntity): CartDatabase {
  return {
    id: cart.id,
    items: cart.items.map((item) =>
      cartItemEntityToCartItemDatabaseMapper(item)
    ),
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
