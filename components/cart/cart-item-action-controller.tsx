import { AddToCartButtonFull } from "@/components/cart/add-to-cart-button-full";
import { Render } from "@/components/common/render";
import { CartItemQuantityControl } from "@/components/cart/cart-item-quantity-control";

type Props = {
  onAddToCart?: () => void | Promise<void>;
  onRemoveFromCart?: () => void | Promise<void>;
  quantity?: number;
};

export const CartItemActionController = ({
  quantity = 0,
  onAddToCart,
  onRemoveFromCart,
}: Props) => {
  const isAddOnly = quantity <= 0;
  return (
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
      <AddToCartButtonFull onClick={onAddToCart} />
    </Render>
  );
};
