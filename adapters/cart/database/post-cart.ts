import { CartEntity } from "@/domain/cart.entities";
import { postDatabaseCart } from "@/infra/services/cart/post-database-cart";
import { mapDomainCartToDatabaseCart } from "@/adapters/cart/database/map-domain-cart-to-database-cart";
import { mapDatabaseCartToDomainCart } from "./map-database-cart-to-domain-cart";
import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";
import { currencyGenericAdapter } from "@/adapters/currency/generic/currency.generic.adapter";

export async function postCart(cart: CartEntity): Promise<CartEntity> {
  const resp = await postDatabaseCart(mapDomainCartToDatabaseCart(cart));

  return mapDatabaseCartToDomainCart(
    resp,
    dateGenericAdapter,
    currencyGenericAdapter
  );
}
