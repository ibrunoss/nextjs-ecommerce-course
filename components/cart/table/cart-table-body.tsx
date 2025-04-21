import { ComponentProps } from "react";

import { TableBody } from "@/components/ui/table";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartTableItemRow } from "@/components/cart/table/item-row/cart-table-item-row";

type Props = ComponentProps<typeof TableBody> & {
  cartItems: CartItemEntity[];
};
export const CartTableBody = ({ cartItems, ...props }: Props) => {
  return (
    <TableBody {...props}>
      {cartItems.map((cartItem) => (
        <CartTableItemRow
          key={cartItem.productId}
          image={cartItem.image}
          name={cartItem.name}
          price={cartItem.price}
          productId={cartItem.productId}
          quantity={cartItem.quantity}
          slug={cartItem.slug}
        />
      ))}
    </TableBody>
  );
};
