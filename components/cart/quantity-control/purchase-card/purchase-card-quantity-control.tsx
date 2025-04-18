import { AddButtonCompactPurchaseCard } from "@/components/cart/quantity-control/purchase-card/add-button-compact-purchase-card";
import { RemoveButtonCompactPurchaseCard } from "@/components/cart/quantity-control/purchase-card/remove-button-compact-purchase-card";
import { DisplayQuantityPurchaseCard } from "@/components/cart/quantity-control/purchase-card/display-quantity-purchase-card";

type Props = {
  quantity: number;
  onAddToCart?: () => void | Promise<void>;
  onRemoveFromCart?: () => void | Promise<void>;
};

export const PurchaseCardQuantityControl = ({
  quantity,
  onAddToCart,
  onRemoveFromCart,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <RemoveButtonCompactPurchaseCard onClick={onRemoveFromCart} />
      <DisplayQuantityPurchaseCard quantity={quantity} />
      <AddButtonCompactPurchaseCard onClick={onAddToCart} />
    </div>
  );
};
