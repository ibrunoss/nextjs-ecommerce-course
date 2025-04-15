import { CartEntity, newCartEntity } from "@/domain/entities/cart.entity";
import { CartDatabase } from "@/infra/types/cart";
import { cartItemDatabaseToCartItemEntity } from "@/infra/mappers/cart/cart-item-database-to-cart-item-entity";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { newDateEntity } from "@/domain/entities/date.entity";

export function mapPrismaCartToDomainCart(dbCart: CartDatabase): CartEntity {
  return newCartEntity({
    id: dbCart.id,
    items: dbCart.items.map((dbCartItem) =>
      cartItemDatabaseToCartItemEntity(dbCartItem)
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
