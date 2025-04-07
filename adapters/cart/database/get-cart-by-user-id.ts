import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";
import { currencyGenericAdapter } from "@/adapters/currency/generic/currency.generic.adapter";
import { CartEntity } from "@/domain/cart.entities";
import { mapDatabaseCartToDomainCart } from "@/adapters/cart/database/map-database-cart-to-domain-cart";
import { getDatabaseCartByUserId } from "@/infra/services/cart/get-database-cart-by-user-id";

export async function getCartByUserId(
  userId: string
): Promise<CartEntity | null> {
  const response = await getDatabaseCartByUserId(userId);
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
