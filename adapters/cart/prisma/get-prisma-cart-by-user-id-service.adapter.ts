import { CartEntity } from "@/domain/entities/cart.entities";
import { getPrismaCartByUserIdService } from "@/infra/services/cart/get-prisma-cart-by-user-id.service";
import { handleGetPrismaCart } from "@/adapters/cart/prisma/handle-get-prisma-cart";

export async function getPrismaCartByUserIdServiceAdapter(
  userId: string
): Promise<CartEntity | null> {
  const response = await getPrismaCartByUserIdService(userId);
  const cart: CartEntity | null = handleGetPrismaCart(response);

  return cart;
}
