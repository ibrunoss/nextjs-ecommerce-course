"use server";
import { cookies } from "next/headers";

import {
  ActionDataState,
  ActionState,
  ActionStateMessage,
  withErrorHandling,
} from "@/lib/actions/utils.actions";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { auth } from "@/auth";
import { getCartAndAddItemToCartHandler } from "@/lib/use-cases-handlers/cart/get-cart-and-add-item-to-cart.handler";
import { getCartAndRemoveItemFromCartHandler } from "@/lib/use-cases-handlers/cart/get-cart-and-remove-item-from-cart.handler";
import { cartRepositoryAdapter } from "@/infra/adapters/cart/cart-repository.adapter";
import { productRepositoryAdapter } from "@/infra/adapters/product/product-repository.adapter";
import { CartEntity } from "@/domain/entities/cart.entity";
import { GetOrCreateCartUseCase } from "@/domain/use-cases/cart/get-or-create-cart.use-case";

export async function addItemToCart(
  prevState: ActionState,
  cartItem: CartItemEntity
): Promise<ActionState> {
  return withErrorHandling(async () => {
    const { sessionCartId, userId } = await getSessionCartIdAndUserId();

    const { itemAlreadyInCart, itemUpdated } =
      await getCartAndAddItemToCartHandler(
        cartRepositoryAdapter,
        productRepositoryAdapter,
        { sessionCartId, userId, cartItem }
      );

    const message: ActionStateMessage = {
      type: "success",
      title: `${
        itemAlreadyInCart ? "Atualizado no" : "Adicionado ao"
      } carrinho`,
      description: `${itemUpdated.quantity}x ${itemUpdated.name}`,
    };

    return {
      success: true,
      message,
    };
  });
}

export async function removeItemFromCart(
  prevState: ActionState,
  cartItem: CartItemEntity
): Promise<ActionState> {
  return withErrorHandling(async () => {
    const { sessionCartId, userId } = await getSessionCartIdAndUserId();

    const { isRemoved, itemUpdated } =
      await getCartAndRemoveItemFromCartHandler(
        cartRepositoryAdapter,
        productRepositoryAdapter,
        {
          sessionCartId,
          userId,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        }
      );

    const message: ActionStateMessage = {
      type: "success",
      title: `${isRemoved ? "Removido do" : "Atualizado no"} carrinho`,
      description: isRemoved
        ? cartItem.name
        : `${itemUpdated?.quantity}x ${itemUpdated?.name}`,
    };

    return {
      success: true,
      message,
    };
  });
}

async function getSessionCartIdAndUserId(): Promise<{
  sessionCartId: string;
  userId?: string;
}> {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) {
    throw new Error("Não foi possível encontrar o ID do carrinho na sessão");
  }

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id;

  return {
    sessionCartId,
    userId,
  };
}

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
