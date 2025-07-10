import { CartEntity } from "@/domain/entities/cart/cart.entity";
import { getPrismaCartByUserIdService } from "@/infra/prisma/services/cart/get-prisma-cart-by-user-id.service";
import { handleGetPrismaCart } from "@/infra/prisma/adapter/cart/handle-get-prisma-cart";

export async function getPrismaCartByUserIdServiceAdapter(
  userId: string
): Promise<CartEntity | null> {
  const response = await getPrismaCartByUserIdService(userId);
  const cart: CartEntity | null = handleGetPrismaCart(response);

  return cart;
}
