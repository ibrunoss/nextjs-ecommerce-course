"use client";
import { Loader2 } from "lucide-react";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionHandler } from "@/containers/cart/cart-item-action-handler";
import { Render } from "@/components/common/render";
import { CartItemQuantityControlCartIcon } from "@/components/cart/item-quantity-action/cart-icon/cart-item-quantity-control-cart-icon";

type Props = {
  quantity: number;
  cartItem: CartItemEntity;
};

export const CartItemQuantityActionCartIcon = ({
  quantity,
  cartItem,
}: Props) => {
  return (
    <CartItemActionHandler cartItem={cartItem}>
      {({ onAddToCart, onRemoveFromCart, isPending }) => (
        <Render
          when={!isPending}
          fallback={<Loader2 className="w-14 h-14 animate-spin" />}
        >
          <CartItemQuantityControlCartIcon
            quantity={quantity}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
          />
        </Render>
      )}
    </CartItemActionHandler>
  );
};
