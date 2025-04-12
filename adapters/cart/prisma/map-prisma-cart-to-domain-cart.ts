import { CartEntity, newCartEntity } from "@/domain/entities/cart.entity";
import { CartDatabase } from "@/infra/db/types/cart";
import { mapPrismaCartItemToDomainCartItem } from "@/adapters/cart/prisma/map-prisma-cart-item-to-domain-cart-item";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { newDateEntity } from "@/domain/entities/date.entity";

export function mapPrismaCartToDomainCart(dbCart: CartDatabase): CartEntity {
  return newCartEntity({
    id: dbCart.id,
    items: dbCart.items.map((dbCartItem) =>
      mapPrismaCartItemToDomainCartItem(dbCartItem)
    ),
    createdAt: newDateEntity(dbCart.createdAt),
    itemsPrice: newCurrencyEntity(dbCart.itemsPrice),
    sessionCartId: dbCart.sessionCartId,
    shippingPrice: newCurrencyEntity(dbCart.shippingPrice),
    taxPrice: newCurrencyEntity(dbCart.taxPrice),
    totalPrice: newCurrencyEntity(dbCart.totalPrice),
    updatedAt: newDateEntity(dbCart.updatedAt),
    userId: dbCart.userId ?? "",
  });
}
