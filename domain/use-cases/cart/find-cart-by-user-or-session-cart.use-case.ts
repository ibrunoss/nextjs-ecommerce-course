import { CartEntity } from "@/domain/entities/cart.entities";
import { CartRepository } from "@/domain/repositories/cart.repository";

export type FindCartByUserOrSessionCartUseCaseParams = {
  cartRepository: CartRepository;
} & (
  | {
      sessionCartId?: string;
      userId: string;
    }
  | {
      sessionCartId: string;
      userId?: string;
    }
);

export async function findCartByUserOrSessionCartUseCase({
  cartRepository,
  sessionCartId,
  userId,
}: FindCartByUserOrSessionCartUseCaseParams): Promise<CartEntity | null> {
  let cart: CartEntity | null = null;

  if (userId) {
    cart = await cartRepository.findByUserId(userId);
  }

  if (cart) {
    return cart;
  }

  if (sessionCartId) {
    cart = await cartRepository.findBySessionCartId(sessionCartId);
  }

  return cart;
}
