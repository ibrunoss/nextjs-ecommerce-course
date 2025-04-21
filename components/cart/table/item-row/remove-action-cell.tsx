import { ComponentProps } from "react";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { TableCellStopPropagation } from "@/components/cart/table/table-cell-stop-propagation";
import { RemoveCartItemActionButton } from "@/components/cart/remove-cart-item-action-button";

type Props = ComponentProps<typeof TableCellStopPropagation> & {
  cartItem: CartItemEntity;
};

export const RemoveActionCell = ({ cartItem, ...props }: Props) => {
  return (
    <TableCellStopPropagation className="text-right" {...props}>
      <RemoveCartItemActionButton cartItem={cartItem} />
    </TableCellStopPropagation>
  );
};
