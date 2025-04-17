import { CartEntity } from "@/domain/entities/cart.entity";
import { updatePrismaCartService } from "@/infra/services/cart/update-prisma-cart.service";
import { cartEntityToCartDatabaseMapper } from "@/infra/mappers/cart/cart-entity-to-cart-database.mapper";
import { cartDatabaseToCartEntity } from "@/infra/mappers/cart/cart-database-to-cart-entity";

export async function updatePrismaCartServiceAdapter(
  cart: CartEntity
): Promise<CartEntity> {
  const cartUpdated = await updatePrismaCartService(
    cartEntityToCartDatabaseMapper(cart)
  );

  return cartDatabaseToCartEntity(cartUpdated);
}
