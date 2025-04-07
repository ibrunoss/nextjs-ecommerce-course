import { CartEntity } from "@/domain/cart.entities";
import { CartDatabase } from "@/infra/db/types/cart";
import { mapDatabaseCartToDomainCart } from "@/adapters/cart/database/map-database-cart-to-domain-cart";
import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";
import { currencyGenericAdapter } from "@/adapters/currency/generic/currency.generic.adapter";

export function handleGetCartDatabase(
  dbCart: CartDatabase | null
): CartEntity | null {
  if (!dbCart) {
    return null;
  }

  let cart: CartEntity | null;

  try {
    cart = mapDatabaseCartToDomainCart(
      dbCart,
      dateGenericAdapter,
      currencyGenericAdapter
    );
  } catch (error) {
    console.error("Error while mapping API cart to domain cart: ", error);
    cart = null;
  }

  return cart;
}
