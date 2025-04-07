import { CartAdapter } from "@/adapters/cart/cart.adapter";
import { getCartBySessionCartId } from "@/adapters/cart/database/get-cart-by-session-cart-id";

export const cartDatabaseAdapter: CartAdapter = {
  getCartBySessionCartId,
};
