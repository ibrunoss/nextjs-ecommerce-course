import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemDatabase } from "@/infra/types/cart";

export function cartItemEntityToCartItemDatabaseMapper(
  cartItem: CartItemEntity
): CartItemDatabase {
  return {
    image: cartItem.image,
    name: cartItem.name,
    price: cartItem.price.originalValue,
    productId: cartItem.productId,
    quantity: cartItem.quantity,
    slug: cartItem.slug,
  };
}
