import { CartEntity } from "@/domain/entities/cart.entity";
import { createPrismaCartService } from "@/infra/services/cart/create-prisma-cart.service";
import { mapDomainCartToPrismaCart } from "@/adapters/cart/prisma/map-domain-cart-to-prisma-cart";

export async function createPrismaCartServiceAdapter(
  cart: CartEntity
): Promise<void> {
  await createPrismaCartService(mapDomainCartToPrismaCart(cart));
}
