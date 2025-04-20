"use client";
import { Loader2 } from "lucide-react";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionProvider } from "@/containers/cart/cart-item-action-provider";
import { Render } from "@/components/common/render";
import { CartItemQuantityControlCartIcon } from "@/components/cart/item-quantity-action/cart-icon/cart-item-quantity-control-cart-icon";
import { useCartItemToasts } from "@/hooks/use-cart-item-toasts";

type Props = {
  quantity: number;
  cartItem: CartItemEntity;
  skipAllToast?: boolean;
  skipErrorToast?: boolean;
  skipSuccessToast?: boolean;
};

export const CartItemQuantityActionCartIcon = ({
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
        <Render
          when={!isPending}
          fallback={<Loader2 className="w-14 h-14 animate-spin" />}
        >
          <CartItemQuantityControlCartIcon
            quantity={quantity}
            onIncrementQuantity={onIncrementQuantity(1)}
            onDecrementQuantity={onDecrementQuantity(1)}
          />
        </Render>
      )}
    </CartItemActionProvider>
  );
};
