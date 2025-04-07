import { CurrencyAdapter } from "@/adapters/currency/currency.adapter";
import { CartItemEntity } from "@/domain/cart.entities";
import { CartItemDatabase } from "@/infra/db/types/cart";

export function mapDatabaseCartItemToDomainCartItem(
  dbCartItem: CartItemDatabase,
  currencyAdapter: CurrencyAdapter
): CartItemEntity {
  return {
    image: dbCartItem.image,
    name: dbCartItem.name,
    price: currencyAdapter.safeCreateEntity(dbCartItem.price),
    productId: dbCartItem.productId,
    quantity: dbCartItem.quantity,
    slug: dbCartItem.slug,
  };
}
