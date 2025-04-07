import { CurrencyAdapter } from "@/adapters/currency/currency.adapter";
import { DateAdapter } from "@/adapters/date/date.adapter";
import { CartEntity } from "@/domain/cart.entities";
import { CartDatabase } from "@/infra/db/types/cart";
import { mapDatabaseCartItemToDomainCartItem } from "@/adapters/cart/database/map-database-cart-item-to-domain-cart-item";

export function mapDatabaseCartToDomainCart(
  dbCart: CartDatabase,
  dateAdapter: DateAdapter,
  currencyAdapter: CurrencyAdapter
): CartEntity {
  return {
    id: dbCart.id,
    items: dbCart.items.map((dbCartItem) =>
      mapDatabaseCartItemToDomainCartItem(dbCartItem, currencyAdapter)
    ),
    createdAt: dateAdapter.safeCreateEntity(dbCart.createdAt),
    itemsPrice: currencyAdapter.safeCreateEntity(dbCart.itemsPrice),
    sessionCartId: dbCart.sessionCartId,
    shippingPrice: currencyAdapter.safeCreateEntity(dbCart.shippingPrice),
    taxPrice: currencyAdapter.safeCreateEntity(dbCart.taxPrice),
    totalPrice: currencyAdapter.safeCreateEntity(dbCart.totalPrice),
    updatedAt: dateAdapter.safeCreateEntity(dbCart.updatedAt),
    userId: dbCart.userId ?? "",
  };
}
