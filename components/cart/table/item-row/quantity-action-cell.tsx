import { ComponentProps } from "react";

import { TableCellStopPropagation } from "@/components/cart/table/table-cell-stop-propagation";
import { CartItemQuantityActionPill } from "@/components/cart/item-quantity-action/pill/cart-item-quantity-action-pill";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";

type Props = ComponentProps<typeof TableCellStopPropagation> & {
  cartItem: CartItemEntity;
  quantity: number;
};

export const QuantityActionCell = ({ cartItem, quantity, ...props }: Props) => {
  return (
    <TableCellStopPropagation {...props}>
      <div className="flex items-center justify-center">
        <CartItemQuantityActionPill
          skipSuccessToast
          cartItem={cartItem}
          quantity={quantity}
        />
      </div>
    </TableCellStopPropagation>
  );
};
