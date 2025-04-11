import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { createCurrencyEntity } from "@/domain/entities/currency.entity";
import { CartItemDatabase } from "@/infra/db/types/cart";

export function mapPrismaCartItemToDomainCartItem(
  dbCartItem: CartItemDatabase
): CartItemEntity {
  return {
    image: dbCartItem.image,
    name: dbCartItem.name,
    price: createCurrencyEntity(dbCartItem.price),
    productId: dbCartItem.productId,
    quantity: dbCartItem.quantity,
    slug: dbCartItem.slug,
  };
}
