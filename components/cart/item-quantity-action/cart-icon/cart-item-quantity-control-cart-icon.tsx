import { Render } from "@/components/common/render";
import { AddCartItemButtonCartIcon } from "@/components/cart/item-quantity-action/cart-icon/add-cart-item-button-cart-icon";
import { IncrementCartItemButtonCartIcon } from "@/components/cart/item-quantity-action/cart-icon/increment-cart-item-button-cart-icon";
import { DecrementCartItemButtonCartIcon } from "@/components/cart/item-quantity-action/cart-icon/decrement-cart-item-button-cart-icon";
import { DisplayQuantityCartIcon } from "@/components/cart/item-quantity-action/cart-icon/display-quantity-cart-icon";

type Props = {
  quantity: number;
  onIncrementQuantity?: () => void | Promise<void>;
  onDecrementQuantity?: () => void | Promise<void>;
};

export const CartItemQuantityControlCartIcon = ({
  onIncrementQuantity,
  onDecrementQuantity,
  quantity = 0,
}: Props) => {
  const isAddOnly = quantity <= 0;
  return (
    <Render
      when={isAddOnly}
      fallback={
        <div className="flex items-center gap-2">
          <DecrementCartItemButtonCartIcon onClick={onDecrementQuantity} />
          <DisplayQuantityCartIcon quantity={quantity} />
          <IncrementCartItemButtonCartIcon onClick={onIncrementQuantity} />
        </div>
      }
    >
      <AddCartItemButtonCartIcon onClick={onIncrementQuantity} />
    </Render>
  );
};
