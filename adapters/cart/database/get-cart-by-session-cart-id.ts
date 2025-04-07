import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";
import { currencyGenericAdapter } from "@/adapters/currency/generic/currency.generic.adapter";
import { CartEntity } from "@/domain/cart.entities";
import { getDatabaseCartBySessionCartId } from "@/infra/services/cart/get-database-cart-by-session-cart-id";
import { mapDatabaseCartToDomainCart } from "@/adapters/cart/database/map-database-cart-to-domain-cart";

export async function getCartBySessionCartId(
  sessionCartId: string
): Promise<CartEntity | null> {
  const response = await getDatabaseCartBySessionCartId(sessionCartId);
  let cart: CartEntity | null;

  if (!response) {
    return null;
  }

  try {
    cart = mapDatabaseCartToDomainCart(
      response,
      dateGenericAdapter,
      currencyGenericAdapter
    );
  } catch (error) {
    console.error("Error while mapping API cart to domain cart: ", error);
    cart = null;
  }

  return cart;
}
