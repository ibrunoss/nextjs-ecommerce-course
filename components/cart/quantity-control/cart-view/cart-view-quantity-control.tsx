import { Loader } from "lucide-react";

import { AddButtonCompactCartView } from "@/components/cart/quantity-control/cart-view/add-button-compact-cart-view";
import { RemoveButtonCompactCartView } from "@/components/cart/quantity-control/cart-view/remove-button-compact-cart-view";
import { DisplayQuantityCartView } from "@/components/cart/quantity-control/cart-view/display-quantity-cart-view";

type Props = {
  isPending?: boolean;
  quantity: number;
  onAddToCart?: () => void | Promise<void>;
  onRemoveFromCart?: () => void | Promise<void>;
};

export const CartViewQuantityControl = ({
  quantity,
  onAddToCart,
  onRemoveFromCart,
  isPending,
}: Props) => {
  return (
    <div className="flex items-center justify-between border-2 rounded-xl">
      <RemoveButtonCompactCartView
        disabled={isPending}
        onClick={onRemoveFromCart}
      />
      <DisplayQuantityCartView
        quantity={
          isPending ? <Loader className="w-4 h-4 animate-spin" /> : quantity
        }
      />

      <AddButtonCompactCartView disabled={isPending} onClick={onAddToCart} />
    </div>
  );
};
