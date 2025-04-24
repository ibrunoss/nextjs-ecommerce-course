import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { CartItemDatabase } from "@/infra/types/cart";
import { productDatabaseToProductEntityMapper } from "@/infra/mappers/product/product-database-to-product-entity.mapper";

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
