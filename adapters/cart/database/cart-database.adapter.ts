import { CartAdapter } from "@/adapters/cart/cart.adapter";
import { getCartBySessionCartId } from "@/adapters/cart/database/get-cart-by-session-cart-id";
import { getCartByUserId } from "@/adapters/cart/database/get-cart-by-user-id";
import { postCart } from "@/adapters/cart/database/post-cart";

export const cartDatabaseAdapter: CartAdapter = {
  getCartBySessionCartId,
  getCartByUserId,
  postCart,
};
