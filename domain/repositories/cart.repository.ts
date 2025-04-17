import { CartEntity } from "@/domain/entities/cart.entity";

export interface CartRepository {
  create(cart: CartEntity): Promise<CartEntity>;
  delete(id: string): Promise<void>;
  findBySessionCartId(sessionId: string): Promise<CartEntity | null>;
  findByUserId(userId: string): Promise<CartEntity | null>;
  save(cart: CartEntity): Promise<CartEntity>;
}
