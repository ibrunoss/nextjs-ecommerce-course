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
import { GetCartAndAddItemToCartUseCase } from "@/domain/use-cases/cart/get-cart-and-add-item-to-cart.use-case";
import { prismaCartRepositoryAdapter } from "@/adapters/cart/prisma-cart-repository.adapter";
import { prismaProductRepositoryAdapter } from "@/adapters/product/prisma-product-repository.adapter";

export async function addItemToCart(
  prevState: ActionState,
  cartItem: CartItemEntity
): Promise<ActionState> {
  try {
    const { sessionCartId, userId = "" } = await getSessionCartIdAndUserId();
    const getCartAndAddItemUseCase = GetCartAndAddItemToCartUseCase(
      prismaCartRepositoryAdapter,
      prismaProductRepositoryAdapter
    );

    await getCartAndAddItemUseCase.execute({ cartItem, sessionCartId, userId });

    return {
      success: true,
      message: `${cartItem.name} adicionado ao carrinho`,
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
