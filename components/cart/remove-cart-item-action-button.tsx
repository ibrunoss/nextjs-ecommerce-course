"use client";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionProvider } from "@/containers/cart/cart-item-action-provider";
import { useCartItemToasts } from "@/hooks/use-cart-item-toasts";
import { RemoveCartItemButton } from "./remove-cart-item-button";

type Props = {
  cartItem: CartItemEntity;
  skipAllToast?: boolean;
  skipErrorToast?: boolean;
  skipSuccessToast?: boolean;
};

export const RemoveCartItemActionButton = ({
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
      {({ onRemoveFromCart }) => (
        <RemoveCartItemButton
          variant="ghost"
          className="text-destructive hover:bg-destructive/80 focus-visible:ring-destructive"
          onClick={onRemoveFromCart}
        />
      )}
    </CartItemActionProvider>
  );
};
