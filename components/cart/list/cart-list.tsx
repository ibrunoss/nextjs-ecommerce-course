import { CartEntity } from "@/domain/entities/cart.entity";
import { CartListItemRow } from "@/components/cart/list/item-row/cart-list-item-row";

type Props = {
  cart: CartEntity;
};

export const CartList = ({ cart }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {cart.items.map((cartItem) => (
        <CartListItemRow
          key={cartItem.productId}
          cartId={cart.id}
          product={cartItem.product}
          quantity={cartItem.quantity}
        />
      ))}
    </div>
  );
};
