import { CartEntity } from "@/domain/entities/cart.entity";
import { getPrismaCartBySessionCartIdService } from "@/infra/services/cart/get-prisma-cart-by-session-cart-id.service";
import { handleGetPrismaCart } from "@/adapters/cart/prisma/handle-get-prisma-cart";

export async function getPrismaCartBySessionCartIdServiceAdapter(
  sessionCartId: string
): Promise<CartEntity | null> {
  const response = await getPrismaCartBySessionCartIdService(sessionCartId);
  const cart: CartEntity | null = handleGetPrismaCart(response);

  return cart;
}
