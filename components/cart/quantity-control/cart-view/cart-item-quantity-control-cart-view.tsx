"use client";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemActionHandler } from "@/containers/cart/cart-item-action-handler";
import { CartViewQuantityControl } from "./cart-view-quantity-control";

type Props = {
  quantity: number;
  cartItem: CartItemEntity;
};

export const CartItemQuantityControlCartView = ({
  quantity,
  cartItem,
}: Props) => {
  return (
    <CartItemActionHandler cartItem={cartItem}>
      {({ onAddToCart, onRemoveFromCart, isPending }) => (
        <CartViewQuantityControl
          isPending={isPending}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          quantity={quantity}
        />
      )}
    </CartItemActionHandler>
  );
};
