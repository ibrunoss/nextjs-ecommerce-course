import { CartItemEntity } from "@/domain/entities/cart/cart-item.entity";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { CartItemDatabase } from "@/infra/prisma/types/cart";
import { productDatabaseToProductEntityMapper } from "@/infra/prisma/mappers/product/product-database-to-product-entity.mapper";

export function cartItemDatabaseToCartItemEntity(
  dbCartItem: CartItemDatabase
): CartItemEntity {
  return {
    cartId: dbCartItem.cartId,
    id: dbCartItem.id,
    product: productDatabaseToProductEntityMapper(dbCartItem.product),
    price: newCurrencyEntity(dbCartItem.price),
    productId: dbCartItem.productId,
    quantity: dbCartItem.quantity,
  };
}
