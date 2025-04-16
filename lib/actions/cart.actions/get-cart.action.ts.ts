"use server";
import {
  ActionDataState,
  withErrorHandling,
} from "@/lib/actions/utils.actions";
import { getSessionCartIdAndUserId } from "@/lib/actions/cart.actions/session-cart.util";
import { cartRepositoryAdapter } from "@/infra/adapters/cart/cart-repository.adapter";
import { CartEntity } from "@/domain/entities/cart.entity";
import { GetOrCreateCartUseCase } from "@/domain/use-cases/cart/get-or-create-cart.use-case";

export async function getCart(prevState: ActionDataState<CartEntity>) {
  return withErrorHandling(
    async () => {
      const { sessionCartId, userId } = await getSessionCartIdAndUserId();
      const getCartUseCase = GetOrCreateCartUseCase(cartRepositoryAdapter);
      const { cart } = await getCartUseCase.execute({ sessionCartId, userId });

      if (!cart) throw new Error("Carrinho não encontrado");

      return {
        success: true,
        message: {
          type: "success",
          description: "Carrinho carregado com sucesso",
        },
        data: cart,
      };
    },
    { data: prevState.data }
  );
}
