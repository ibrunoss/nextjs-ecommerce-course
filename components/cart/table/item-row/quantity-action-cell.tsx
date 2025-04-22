import { ComponentProps } from "react";

import { TableCellStopPropagation } from "@/components/cart/table/table-cell-stop-propagation";
import { CartItemQuantityActionPill } from "@/components/cart/item-quantity-action/pill/cart-item-quantity-action-pill";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { RemoveCartItemActionButton } from "@/components/cart/remove-cart-item-action-button";

type Props = ComponentProps<typeof TableCellStopPropagation> & {
  cartItem: CartItemEntity;
  quantity: number;
};

export const QuantityActionCell = ({ cartItem, quantity, ...props }: Props) => {
  return (
    <TableCellStopPropagation {...props}>
      <div className="flex flex-col items-center justify-center">
        <CartItemQuantityActionPill
          skipSuccessToast
          cartItem={cartItem}
          quantity={quantity}
        />
        <RemoveCartItemActionButton cartItem={cartItem} />
      </div>
    </TableCellStopPropagation>
  );
};
