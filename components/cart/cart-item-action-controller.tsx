"use client";
import { Loader2 } from "lucide-react";

import { AddToCartButtonFull } from "@/components/cart/add-to-cart-button-full";
import { Render } from "@/components/common/render";
import { CartItemQuantityControl } from "@/components/cart/cart-item-quantity-control";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionHandler } from "@/containers/cart/cart-item-action-handler";

type Props = {
  quantity?: number;
  cartItem: CartItemEntity;
};

export const CartItemActionController = ({ cartItem, quantity = 0 }: Props) => {
  const isAddOnly = quantity <= 0;
  return (
    <CartItemActionHandler
      cartItem={cartItem}
      fallback={<Loader2 className="w-14 h-14 animate-spin" />}
    >
      {({ onAddToCart, onRemoveFromCart }) => (
        <Render
          when={isAddOnly}
          fallback={
            <CartItemQuantityControl
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              quantity={quantity}
            />
          }
        >
          <AddToCartButtonFull className="mt-3 mb-2" onClick={onAddToCart} />
        </Render>
      )}
    </CartItemActionHandler>
  );
};
