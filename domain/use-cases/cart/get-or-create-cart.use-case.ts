import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { FindCartByUserOrSessionCartUseCase } from "@/domain/use-cases/cart/find-cart-by-user-or-session-cart.use-case";
import { CreateNewCartUseCase } from "@/domain/use-cases/cart/create-new-cart.use-case";

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

export function GetOrCreateCartUseCase(cartRepository: CartRepository) {
  const execute = async ({
    sessionCartId = "",
    userId,
  }: Input): Promise<Output> => {
    const findCartUseCase = FindCartByUserOrSessionCartUseCase(cartRepository);

    let { cart } = await findCartUseCase.execute({
      sessionCartId,
      userId,
    });

    if (!cart) {
      const createNewCart = CreateNewCartUseCase(cartRepository);
      cart = (
        await createNewCart.execute({
          sessionCartId,
          userId,
        })
      ).cart;
    }

    return { cart };
  };

  return { execute };
}
