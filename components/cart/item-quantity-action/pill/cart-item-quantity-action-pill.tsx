"use client";
import { Loader } from "lucide-react";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionHandler } from "@/containers/cart/cart-item-action-handler";
import { IncrementCartItemButtonPill } from "@/components/cart/item-quantity-action/pill/increment-cart-item-button-pill";
import { DecrementCartItemButtonPill } from "@/components/cart/item-quantity-action/pill/decrement-cart-item-button-pill";
import { DisplayQuantityPill } from "@/components/cart/item-quantity-action/pill/display-quantity-pill";

type Props = {
  quantity: number;
  cartItem: CartItemEntity;
};

export const CartItemQuantityActionPill = ({ quantity, cartItem }: Props) => {
  return (
    <CartItemActionHandler cartItem={cartItem}>
      {({ onIncrementQuantity, onDecrementQuantity, isPending }) => (
        <div className="flex items-center justify-between border-2 rounded-xl">
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
    </CartItemActionHandler>
  );
};
