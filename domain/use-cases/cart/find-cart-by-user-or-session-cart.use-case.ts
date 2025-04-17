import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";

type Input =
  | {
      sessionCartId?: string;
      userId: string;
    }
  | {
      sessionCartId: string;
      userId?: string;
    };

type Output = {
  cart: CartEntity | null;
};

export function FindCartByUserOrSessionCartUseCase(
  cartRepository: CartRepository
) {
  const execute = async ({ sessionCartId, userId }: Input): Promise<Output> => {
    let cart: CartEntity | null = null;

    if (userId) {
      cart = await cartRepository.findByUserId(userId);
    }

    if (!cart && sessionCartId) {
      cart = await cartRepository.findBySessionCartId(sessionCartId);
    }

    return { cart };
  };

  return { execute };
}
