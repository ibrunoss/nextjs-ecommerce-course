import { CartEntity } from "@/domain/cart.entities";

export interface CartAdapter {
  getCartBySessionCartId(sessionCartId: string): Promise<CartEntity | null>;
}
