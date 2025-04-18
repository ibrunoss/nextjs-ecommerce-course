"use client";
import { Loader } from "lucide-react";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionHandler } from "@/containers/cart/cart-item-action-handler";
import { AddToCartButtonPill } from "@/components/cart/item-quantity-action/pill/add-to-cart-button-pill";
import { RemoveFromCartButtonPill } from "@/components/cart/item-quantity-action/pill/remove-from-cart-button-pill";
import { DisplayQuantityPill } from "@/components/cart/item-quantity-action/pill/display-quantity-pill";

type Props = {
  quantity: number;
  cartItem: CartItemEntity;
};

export const CartItemQuantityActionPill = ({ quantity, cartItem }: Props) => {
  return (
    <CartItemActionHandler cartItem={cartItem}>
      {({ onAddToCart, onRemoveFromCart, isPending }) => (
        <div className="flex items-center justify-between border-2 rounded-xl">
          <RemoveFromCartButtonPill
            disabled={isPending}
            onClick={onRemoveFromCart}
          />
          <DisplayQuantityPill
            quantity={
              isPending ? <Loader className="w-4 h-4 animate-spin" /> : quantity
            }
          />

          <AddToCartButtonPill disabled={isPending} onClick={onAddToCart} />
        </div>
      )}
    </CartItemActionHandler>
  );
};
