import { CartEntity } from "@/domain/entities/cart.entity";
import { updatePrismaCartService } from "@/infra/services/cart/update-prisma-cart.service";
import { mapDomainCartToPrismaDbCart } from "@/adapters/cart/prisma/map-domain-cart-to-prisma-db-cart";

export async function updatePrismaCartServiceAdapter(
  cart: CartEntity
): Promise<void> {
  await updatePrismaCartService(mapDomainCartToPrismaDbCart(cart));
}
