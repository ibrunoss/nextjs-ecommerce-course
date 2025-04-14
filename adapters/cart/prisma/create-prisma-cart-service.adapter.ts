import { CartEntity } from "@/domain/entities/cart.entity";
import { createPrismaCartService } from "@/infra/services/cart/create-prisma-cart.service";
import { mapDomainCartToPrismaCart } from "@/adapters/cart/prisma/map-domain-cart-to-prisma-cart";
import { mapPrismaCartToDomainCart } from "@/adapters/cart/prisma/map-prisma-cart-to-domain-cart";

export async function createPrismaCartServiceAdapter(
  cart: CartEntity
): Promise<CartEntity> {
  const response = await createPrismaCartService(
    mapDomainCartToPrismaCart(cart)
  );

  return mapPrismaCartToDomainCart(response);
}
