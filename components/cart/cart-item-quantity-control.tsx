import { ShoppingCart } from "lucide-react";

import { RemoveFromCartButtonCompact } from "@/components/cart/remove-from-cart-button-compact";
import { AddToCartButtonCompact } from "@/components/cart/add-to-cart-button-compact";

type Props = {
  quantity: number;
  onAddToCart?: () => void | Promise<void>;
  onRemoveFromCart?: () => void | Promise<void>;
};

export const CartItemQuantityControl = ({
  quantity,
  onAddToCart,
  onRemoveFromCart,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <RemoveFromCartButtonCompact onClick={onRemoveFromCart} />
      <div className="rounded-lg text-sm font-semibold p-1 relative">
        <ShoppingCart className="w-12 h-12 text-muted-foreground" />
        <p className="rounded-full bg-green-50 min-w-8 h-auto text-center text-sm text-green-600 font-semibold absolute top-0 right-0 p-1">
          {quantity}
        </p>
      </div>

      <AddToCartButtonCompact onClick={onAddToCart} />
    </div>
  );
};
