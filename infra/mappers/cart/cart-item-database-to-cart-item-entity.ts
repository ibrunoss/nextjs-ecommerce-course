import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { CartItemDatabase } from "@/infra/types/cart";

export function cartItemDatabaseToCartItemEntity(
  dbCartItem: CartItemDatabase
): CartItemEntity {
  return {
    image: dbCartItem.image,
    name: dbCartItem.name,
    price: newCurrencyEntity(dbCartItem.price),
    productId: dbCartItem.productId,
    quantity: dbCartItem.quantity,
    slug: dbCartItem.slug,
  };
}
