import { CartEntity } from "@/domain/cart.entities";
import { getDatabaseCartBySessionCartId } from "@/infra/services/cart/get-database-cart-by-session-cart-id";
import { handleGetCartDatabase } from "./handle-get-cart-database";

export async function getCartBySessionCartId(
  sessionCartId: string
): Promise<CartEntity | null> {
  const response = await getDatabaseCartBySessionCartId(sessionCartId);
  const cart: CartEntity | null = handleGetCartDatabase(response);

  return cart;
}
