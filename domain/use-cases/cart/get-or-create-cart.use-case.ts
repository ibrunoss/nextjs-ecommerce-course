import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { findCartByUserOrSessionCartUseCase } from "@/domain/use-cases/cart/find-cart-by-user-or-session-cart.use-case";
import { createNewCartUseCase } from "@/domain/use-cases/cart/create-new-cart.use-case";
import { CurrencyAdapter } from "@/adapters/currency/currency.adapter";
import { DateAdapter } from "@/adapters/date/date.adapter";

export type GetOrCreateCartUseCaseParams = {
  cartRepository: CartRepository;
  currencyAdapter: CurrencyAdapter;
  dateAdapter: DateAdapter;
  sessionCartId?: string;
  userId?: string;
};

export async function getOrCreateCartUseCase({
  cartRepository,
  currencyAdapter,
  dateAdapter,
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
      currencyAdapter,
      dateAdapter,
      sessionCartId,
      userId,
    });
  }

  return cart;
}
