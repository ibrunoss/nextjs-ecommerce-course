import { CartEntity } from "@/domain/entities/cart.entity";
import { CartDatabase } from "@/infra/types/cart";
import { mapPrismaCartToDomainCart } from "@/infra/mappers/cart/cart-database-to-cart-entity";

export function handleGetPrismaCart(
  dbCart: CartDatabase | null
): CartEntity | null {
  if (!dbCart) {
    return null;
  }

  let cart: CartEntity | null;

  try {
    cart = mapPrismaCartToDomainCart(dbCart);
  } catch (error) {
    console.error("Error while mapping API cart to domain cart: ", error);
    cart = null;
  }

  return cart;
}
