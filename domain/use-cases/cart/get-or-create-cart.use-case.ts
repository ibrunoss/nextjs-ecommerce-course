import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { findCartByUserOrSessionCartUseCase } from "@/domain/use-cases/cart/find-cart-by-user-or-session-cart.use-case";
import { createNewCartUseCase } from "@/domain/use-cases/cart/create-new-cart.use-case";

export type GetOrCreateCartUseCaseParams = {
  cartRepository: CartRepository;
  sessionCartId?: string;
  userId?: string;
};

export async function getOrCreateCartUseCase({
  cartRepository,
  sessionCartId = "",
  userId,
}: GetOrCreateCartUseCaseParams): Promise<CartEntity> {
  let cart: CartEntity | null = await findCartByUserOrSessionCartUseCase({
    cartRepository,
    sessionCartId,
    userId,
  });

  if (!cart) {
    cart = await createNewCartUseCase({
      cartRepository,
      sessionCartId,
      userId,
    });
  }

  return cart;
}
