"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { ActionState } from "@/lib/actions/utils.actions";
import { CartItemEntity } from "@/domain/cart.entities";

export async function addItemToCart(
  prevState: ActionState,
  data: CartItemEntity
): Promise<ActionState> {
  try {
    return {
      success: true,
      message: `${data.name} adicionado ao carrinho`,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      errors: [
        {
          code: "",
          message: data.name,
          path: "",
        },
      ],
      success: false,
      message: "Falha ao adicionar item",
    };
  }
}
