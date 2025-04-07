import { CartItemEntity } from "@/domain/cart.entities";
import { CartItemDatabase } from "@/infra/db/types/cart";

export function mapDomainCartItemToDatabaseCartItem(
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
