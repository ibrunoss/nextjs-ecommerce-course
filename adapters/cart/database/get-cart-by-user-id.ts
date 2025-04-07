import { CartEntity } from "@/domain/cart.entities";
import { getDatabaseCartByUserId } from "@/infra/services/cart/get-database-cart-by-user-id";
import { handleGetCartDatabase } from "@/adapters/cart/database/handle-get-cart-database";

export async function getCartByUserId(
  userId: string
): Promise<CartEntity | null> {
  const response = await getDatabaseCartByUserId(userId);
  const cart: CartEntity | null = handleGetCartDatabase(response);

  return cart;
}
