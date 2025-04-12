import { CartEntity, newCartEntity } from "@/domain/entities/cart.entity";
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
  cart: CartEntity;
};

export function CreateNewCartUseCase(cartRepository: CartRepository) {
  const execute = async ({
    sessionCartId = "",
    userId,
  }: Input): Promise<Output> => {
    const cart = newCartEntity({
      sessionCartId,
      userId,
    });

    await cartRepository.create(cart);

    return { cart };
  };

  return { execute };
}
