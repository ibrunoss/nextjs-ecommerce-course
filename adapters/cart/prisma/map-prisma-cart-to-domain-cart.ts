import { CartEntity, newCartEntity } from "@/domain/entities/cart.entity";
import { CartDatabase } from "@/infra/db/types/cart";
import { mapPrismaCartItemToDomainCartItem } from "@/adapters/cart/prisma/map-prisma-cart-item-to-domain-cart-item";
import { createCurrencyEntity } from "@/domain/entities/currency.entity";
import { newDateEntity } from "@/domain/entities/date.entity";

export function mapPrismaCartToDomainCart(dbCart: CartDatabase): CartEntity {
  return newCartEntity({
    id: dbCart.id,
    items: dbCart.items.map((dbCartItem) =>
      mapPrismaCartItemToDomainCartItem(dbCartItem)
    ),
    createdAt: newDateEntity(dbCart.createdAt),
    itemsPrice: createCurrencyEntity(dbCart.itemsPrice),
    sessionCartId: dbCart.sessionCartId,
    shippingPrice: createCurrencyEntity(dbCart.shippingPrice),
    taxPrice: createCurrencyEntity(dbCart.taxPrice),
    totalPrice: createCurrencyEntity(dbCart.totalPrice),
    updatedAt: newDateEntity(dbCart.updatedAt),
    userId: dbCart.userId ?? "",
  });
}
