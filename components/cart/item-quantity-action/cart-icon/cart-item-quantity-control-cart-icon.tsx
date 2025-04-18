import { Render } from "@/components/common/render";
import { AddToCartButtonFullCartIcon } from "@/components/cart/item-quantity-action/cart-icon/add-to-cart-button-full-cart-icon";
import { AddToCartButtonCompactCartIcon } from "@/components/cart/item-quantity-action/cart-icon/add-to-cart-button-compact-cart-icon";
import { RemoveFromCartButtonCartIcon } from "@/components/cart/item-quantity-action/cart-icon/remove-from-cart-button-cart-icon";
import { DisplayQuantityCartIcon } from "@/components/cart/item-quantity-action/cart-icon/display-quantity-cart-icon";

type Props = {
  quantity: number;
  onAddToCart?: () => void | Promise<void>;
  onRemoveFromCart?: () => void | Promise<void>;
};

export const CartItemQuantityControlCartIcon = ({
  onAddToCart,
  onRemoveFromCart,
  quantity = 0,
}: Props) => {
  const isAddOnly = quantity <= 0;
  return (
    <Render
      when={isAddOnly}
      fallback={
        <div className="flex items-center gap-2">
          <RemoveFromCartButtonCartIcon onClick={onRemoveFromCart} />
          <DisplayQuantityCartIcon quantity={quantity} />
          <AddToCartButtonCompactCartIcon onClick={onAddToCart} />
        </div>
      }
    >
      <AddToCartButtonFullCartIcon onClick={onAddToCart} />
    </Render>
  );
};
