import { CartEntity } from "@/domain/entities/cart/cart.entity";
import { createPrismaCartService } from "@/infra/prisma/services/cart/create-prisma-cart.service";
import { cartEntityToCartDatabaseInsertMapper } from "@/infra/prisma/mappers/cart/cart-entity-to-cart-database-insert.mapper";
import { cartDatabaseToCartEntity } from "@/infra/prisma/mappers/cart/cart-database-to-cart-entity";

export async function createPrismaCartServiceAdapter(
  cart: CartEntity
): Promise<CartEntity> {
  const response = await createPrismaCartService(
    cartEntityToCartDatabaseInsertMapper(cart)
  );

  return cartDatabaseToCartEntity(response);
}
