"use client";
import { useTransition } from "react";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { addItemToCart } from "@/lib/actions/cart.actions/add-item-to-cart.action";
import { removeItemFromCart } from "@/lib/actions/cart.actions/remove-item-from-cart.action";
import {
  ActionState,
  ActionStateError,
  initialActionState,
} from "@/lib/actions/utils.actions";

type Props = {
  cartItem: CartItemEntity;
  onSuccess?: (message: ActionState["message"]) => void;
  onError?: (
    message: ActionState["message"],
    errors: ActionStateError["errors"]
  ) => void;
  children: (props: {
    isPending: boolean;
    onAddToCart: () => void | Promise<void>;
    onRemoveFromCart: () => void | Promise<void>;
    onDecrementQuantity: (quantity: number) => () => void | Promise<void>;
    onIncrementQuantity: (quantity: number) => () => void | Promise<void>;
  }) => React.ReactNode;
};

export const CartItemActionProvider = ({
  cartItem,
  onSuccess,
  onError,
  children,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleCartAction = async (
    action: (state: ActionState, item: CartItemEntity) => Promise<ActionState>,
    quantity?: number
  ) => {
    startTransition(async () => {
      const response = await action(initialActionState, {
        ...cartItem,
        quantity: quantity ?? cartItem.quantity,
      });

      if (!response.success) {
        onError?.(response.message, response.errors);
        return;
      }

      onSuccess?.(response.message);
    });
  };

  const onAddToCart = () => handleCartAction(addItemToCart);
  const onRemoveFromCart = () =>
    handleCartAction(removeItemFromCart, Number.MAX_VALUE);
  const onDecrementQuantity = (quantity: number) => () =>
    handleCartAction(removeItemFromCart, quantity);
  const onIncrementQuantity = (quantity: number) => () =>
    handleCartAction(addItemToCart, quantity);

  return children({
    isPending,
    onAddToCart,
    onRemoveFromCart,
    onDecrementQuantity,
    onIncrementQuantity,
  });
};
