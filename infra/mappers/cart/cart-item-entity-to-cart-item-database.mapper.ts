import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemDatabase } from "@/infra/types/cart";
import { productEntityToProductDatabaseMapper } from "@/infra/mappers/product/product-entity-to-product-database.mapper copy";

export function cartItemEntityToCartItemDatabaseMapper(
  cartItem: CartItemEntity
): CartItemDatabase {
  return {
    id: cartItem.id,
    cartId: cartItem.cartId,
    product: productEntityToProductDatabaseMapper(cartItem.product),
    price: cartItem.price.originalValue,
    productId: cartItem.productId,
    quantity: cartItem.quantity,
  };
}
