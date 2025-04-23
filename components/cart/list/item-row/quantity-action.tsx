import { ComponentProps } from "react";

import { CartItemQuantityActionPill } from "@/components/cart/item-quantity-action/pill/cart-item-quantity-action-pill";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { RemoveCartItemActionButton } from "@/components/cart/remove-cart-item-action-button";
import { cn } from "@/lib/utils";

type Props = Omit<ComponentProps<"div">, "children"> & {
  cartItem: CartItemEntity;
  quantity: number;
};

export const QuantityAction = ({
  cartItem,
  className,
  quantity,
  ...props
}: Props) => {
  return (
    <div className="flex items-center justify-start md:justify-center col-span-2 md:col-span-1">
      <div
        className={cn("flex flex-col items-center justify-center", className)}
        {...props}
      >
        <p className="pb-1.5 text-muted-foreground text-xs text-center">
          Quantidade
        </p>
        <CartItemQuantityActionPill
          skipSuccessToast
          cartItem={cartItem}
          quantity={quantity}
        />
        <RemoveCartItemActionButton skipSuccessToast cartItem={cartItem} />
      </div>
    </div>
  );
};
