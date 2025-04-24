"use server";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import {
  ActionState,
  ActionStateMessage,
  withErrorHandling,
} from "@/lib/actions/utils.actions";
import { getSessionCartIdAndUserId } from "@/lib/actions/cart.actions/session-cart.util";
import { getCartAndAddItemToCartHandler } from "@/lib/use-cases-handlers/cart/get-cart-and-add-item-to-cart.handler";
import { cartRepositoryAdapter } from "@/infra/adapters/cart/cart-repository.adapter";
import { productRepositoryAdapter } from "@/infra/adapters/product/product-repository.adapter";

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
      description: `${itemUpdated.quantity}x ${itemUpdated.product.name}`,
    };

    return {
      success: true,
      message,
    };
  });
}
