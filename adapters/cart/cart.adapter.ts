import { CartEntity } from "@/domain/cart.entities";

export interface CartAdapter {
  getCartBySessionCartId(sessionCartId: string): Promise<CartEntity | null>;
  getCartByUserId(userId: string): Promise<CartEntity | null>;
  postCart(cart: CartEntity): Promise<CartEntity>;
}
