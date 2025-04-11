import { DateAdapter } from "@/adapters/date/date.adapter";
import { CartEntity } from "@/domain/entities/cart.entity";
import { CartDatabase } from "@/infra/db/types/cart";
import { mapPrismaCartItemToDomainCartItem } from "@/adapters/cart/prisma/map-prisma-cart-item-to-domain-cart-item";
import { createCurrencyEntity } from "@/domain/entities/currency.entity";

export function mapPrismaCartToDomainCart(
  dbCart: CartDatabase,
  dateAdapter: DateAdapter
): CartEntity {
  return {
    id: dbCart.id,
    items: dbCart.items.map((dbCartItem) =>
      mapPrismaCartItemToDomainCartItem(dbCartItem)
    ),
    createdAt: dateAdapter.safeCreateEntity(dbCart.createdAt),
    itemsPrice: createCurrencyEntity(dbCart.itemsPrice),
    sessionCartId: dbCart.sessionCartId,
    shippingPrice: createCurrencyEntity(dbCart.shippingPrice),
    taxPrice: createCurrencyEntity(dbCart.taxPrice),
    totalPrice: createCurrencyEntity(dbCart.totalPrice),
    updatedAt: dateAdapter.safeCreateEntity(dbCart.updatedAt),
    userId: dbCart.userId ?? "",
  };
}
