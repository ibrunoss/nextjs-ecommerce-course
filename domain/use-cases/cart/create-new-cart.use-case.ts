import { CartEntity, newCartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";

export type FindCartByUserOrSessionCartUseCaseParams = {
  cartRepository: CartRepository;
  sessionCartId: string;
  userId?: string;
};

export async function createNewCartUseCase({
  cartRepository,
  sessionCartId,
  userId,
}: FindCartByUserOrSessionCartUseCaseParams): Promise<CartEntity> {
  const cart: CartEntity = newCartEntity({
    userId,
    sessionCartId,
  });

  await cartRepository.create(cart);

  return cart;
}
