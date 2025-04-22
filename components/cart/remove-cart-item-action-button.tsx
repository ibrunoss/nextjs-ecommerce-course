"use client";
import { ComponentProps } from "react";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionProvider } from "@/containers/cart/cart-item-action-provider";
import { useCartItemToasts } from "@/hooks/use-cart-item-toasts";
import { RemoveCartItemButton } from "@/components/cart/remove-cart-item-button";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof RemoveCartItemButton> & {
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
  className,
  ...props
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
          className={cn(
            "text-destructive hover:bg-destructive/80 focus-visible:ring-destructive",
            className
          )}
          onClick={onRemoveFromCart}
          {...props}
        />
      )}
    </CartItemActionProvider>
  );
};
