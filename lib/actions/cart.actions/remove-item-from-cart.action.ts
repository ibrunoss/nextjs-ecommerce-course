"use server";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import {
  ActionState,
  ActionStateMessage,
  withErrorHandling,
} from "../utils.actions";
import { getSessionCartIdAndUserId } from "@/lib/actions/cart.actions/session-cart.util";
import { cartRepositoryAdapter } from "@/infra/adapters/cart/cart-repository.adapter";
import { productRepositoryAdapter } from "@/infra/adapters/product/product-repository.adapter";
import { getCartAndRemoveItemFromCartHandler } from "@/lib/use-cases-handlers/cart/get-cart-and-remove-item-from-cart.handler";

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
