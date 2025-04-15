import { CartEntity } from "@/domain/entities/cart.entity";
import { updatePrismaCartService } from "@/infra/services/cart/update-prisma-cart.service";
import { cartEntityToCartDatabaseMapper } from "@/infra/mappers/cart/cart-entity-to-cart-database.mapper";

export async function updatePrismaCartServiceAdapter(
  cart: CartEntity
): Promise<void> {
  await updatePrismaCartService(cartEntityToCartDatabaseMapper(cart));
}
