import { CartEntity } from "@/domain/entities/cart.entity";
import { CartDatabase } from "@/infra/db/types/cart";
import { mapPrismaCartToDomainCart } from "@/adapters/cart/prisma/map-prisma-cart-to-domain-cart";
import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";
import { currencyGenericAdapter } from "@/adapters/currency/generic/currency.generic.adapter";

export function handleGetPrismaCart(
  dbCart: CartDatabase | null
): CartEntity | null {
  if (!dbCart) {
    return null;
  }

  let cart: CartEntity | null;

  try {
    cart = mapPrismaCartToDomainCart(
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
