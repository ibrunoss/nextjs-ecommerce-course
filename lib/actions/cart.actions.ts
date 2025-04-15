"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";

import {
  ActionState,
  CathActionError,
  getActionErrors,
} from "@/lib/actions/utils.actions";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { auth } from "@/auth";
import { getCartAndAddItemToCartHandler } from "@/lib/use-cases-handlers/cart/get-cart-and-add-item-to-cart.handler";
import { cartRepositoryAdapter } from "@/infra/adapters/cart/cart-repository.adapter";
import { productRepositoryAdapter } from "@/infra/adapters/product/product-repository.adapter";

export async function addItemToCart(
  prevState: ActionState,
  cartItem: CartItemEntity
): Promise<ActionState> {
  try {
    const { sessionCartId, userId } = await getSessionCartIdAndUserId();

    const { itemAlreadyInCart } = await getCartAndAddItemToCartHandler(
      cartRepositoryAdapter,
      productRepositoryAdapter,
      { sessionCartId, userId, cartItem }
    );

    const message = `${cartItem.name} ${
      itemAlreadyInCart ? "atualizado" : "adicionado"
    } ao carrinho`;

    return {
      success: true,
      message,
    };
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    const error = e as CathActionError;

    return getActionErrors({ error });
  }
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
