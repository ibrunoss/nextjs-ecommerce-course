import { CartEntity } from "@/domain/cart.entities";

export interface CartAdapter {
  getCartBySessionCartId(): Promise<CartEntity | null>;
}
