import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemRow } from "./card-item-row";

type Props = {
  data: CartItemEntity[];
};
export const CartItemTable = ({ data }: Props) => {
  return (
    <table className="w-full text-sm text-gray-500">
      <thead>
        <tr>
          <th colSpan={2}>Produto</th>
          <th>Preço unitário</th>
          <th>Quantidade</th>
          <th>Subtotal</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((cartItem) => (
          <CartItemRow
            key={cartItem.productId}
            image={cartItem.image}
            name={cartItem.name}
            price={cartItem.price}
            productId={cartItem.productId}
            quantity={cartItem.quantity}
            slug={cartItem.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
