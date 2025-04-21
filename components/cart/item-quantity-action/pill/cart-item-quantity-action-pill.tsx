"use client";
import { Loader } from "lucide-react";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionProvider } from "@/containers/cart/cart-item-action-provider";
import { IncrementCartItemButtonPill } from "@/components/cart/item-quantity-action/pill/increment-cart-item-button-pill";
import { DecrementCartItemButtonPill } from "@/components/cart/item-quantity-action/pill/decrement-cart-item-button-pill";
import { DisplayQuantityPill } from "@/components/cart/item-quantity-action/pill/display-quantity-pill";
import { useCartItemToasts } from "@/hooks/use-cart-item-toasts";

type Props = {
  quantity: number;
  cartItem: CartItemEntity;
  skipAllToast?: boolean;
  skipErrorToast?: boolean;
  skipSuccessToast?: boolean;
};

export const CartItemQuantityActionPill = ({
  quantity,
  cartItem,
  skipAllToast,
  skipErrorToast,
  skipSuccessToast,
}: Props) => {
  const { showErrorToast, showSuccessToast } = useCartItemToasts({
    skipErrorToast: skipAllToast || skipErrorToast,
    skipSuccessToast: skipAllToast || skipSuccessToast,
  });

  return (
    <CartItemActionProvider
      cartItem={cartItem}
      onError={showErrorToast}
      onSuccess={showSuccessToast}
    >
      {({ onIncrementQuantity, onDecrementQuantity, isPending }) => (
        <div className="flex items-center justify-between border-2 rounded-xl bg-background">
          <DecrementCartItemButtonPill
            disabled={isPending}
            onClick={onDecrementQuantity(cartItem.quantity)}
          />
          <DisplayQuantityPill
            quantity={
              isPending ? <Loader className="w-4 h-4 animate-spin" /> : quantity
            }
          />

          <IncrementCartItemButtonPill
            disabled={isPending}
            onClick={onIncrementQuantity(cartItem.quantity)}
          />
        </div>
      )}
    </CartItemActionProvider>
  );
};
