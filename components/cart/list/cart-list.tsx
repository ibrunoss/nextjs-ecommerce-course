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
          brand="Marca"
          category="Categoria"
          image={cartItem.image}
          name={cartItem.name}
          price={cartItem.price}
          productId={cartItem.productId}
          quantity={cartItem.quantity}
          slug={cartItem.slug}
        />
      ))}
    </div>
  );
};
