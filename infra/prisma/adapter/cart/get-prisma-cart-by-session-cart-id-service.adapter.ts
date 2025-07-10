import { CartEntity } from "@/domain/entities/cart/cart.entity";
import { getPrismaCartBySessionCartIdService } from "@/infra/prisma/services/cart/get-prisma-cart-by-session-cart-id.service";
import { handleGetPrismaCart } from "@/infra/prisma/adapter/cart/handle-get-prisma-cart";

export async function getPrismaCartBySessionCartIdServiceAdapter(
  sessionCartId: string
): Promise<CartEntity | null> {
  const response = await getPrismaCartBySessionCartIdService(sessionCartId);
  const cart: CartEntity | null = handleGetPrismaCart(response);

  return cart;
}
