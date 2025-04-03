"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";

import {
  ActionState,
  CathActionError,
  getActionErrors,
} from "@/lib/actions/utils.actions";
import { CartItemEntity } from "@/domain/cart.entities";

export async function addItemToCart(
  prevState: ActionState,
  data: CartItemEntity
): Promise<ActionState> {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    console.log({ sessionCartId });
    return {
      success: true,
      message: `${data.name} adicionado ao carrinho`,
    };
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    const error = e as CathActionError;

    return getActionErrors({ error });
  }
}
