"use client";
import { Loader2 } from "lucide-react";

import { Render } from "@/components/common/render";
import { PurchaseCardQuantityControl } from "@/components/cart/quantity-control/purchase-card/purchase-card-quantity-control";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionHandler } from "@/containers/cart/cart-item-action-handler";
import { AddToCartButtonFullPurchaseCard } from "@/components/cart/quantity-control/purchase-card/add-button-full-purchase-card";

type Props = {
  quantity?: number;
  cartItem: CartItemEntity;
};

export const CartItemQuantityControlPurchaseCard = ({
  cartItem,
  quantity = 0,
}: Props) => {
  const isAddOnly = quantity <= 0;
  return (
    <CartItemActionHandler cartItem={cartItem}>
      {({ onAddToCart, onRemoveFromCart, isPending }) => (
        <Render
          when={!isPending}
          fallback={<Loader2 className="w-14 h-14 animate-spin" />}
        >
          <Render
            when={isAddOnly}
            fallback={
              <PurchaseCardQuantityControl
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                quantity={quantity}
              />
            }
          >
            <AddToCartButtonFullPurchaseCard onClick={onAddToCart} />
          </Render>
        </Render>
      )}
    </CartItemActionHandler>
  );
};
