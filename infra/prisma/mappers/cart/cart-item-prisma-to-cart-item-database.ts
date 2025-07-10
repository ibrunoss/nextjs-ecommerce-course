import { CartItemDatabase, CartItemPrisma } from "@/infra/prisma/types/cart";
import { productPrismaToProductDatabaseMapper } from "@/infra/prisma/mappers/product/product-prisma-to-product-database.mapper";

export function cartItemPrismaToCartItemDatabaseMapper(
  prismaCartItem: CartItemPrisma
): CartItemDatabase {
  const product = productPrismaToProductDatabaseMapper(prismaCartItem.product);
  return {
    id: prismaCartItem.id,
    cartId: prismaCartItem.cartId,
    product,
    price: product.price,
    productId: prismaCartItem.productId,
    quantity: prismaCartItem.quantity,
  };
}
