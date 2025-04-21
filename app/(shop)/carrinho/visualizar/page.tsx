import { CartItemTable } from "@/components/cart/cart-item-table";
import { newCartEntity } from "@/domain/entities/cart.entity";
import { getCart } from "@/lib/actions/cart.actions/get-cart.action.ts";
import { initialActionDataState } from "@/lib/actions/utils.actions";

export const metadata = {
  title: "Carrinho",
  description: "Carrinho de compras",
};

export default async function CartViewPage() {
  const { data: cart } = await getCart(initialActionDataState(newCartEntity()));
  return (
    <>
      <h1>Carrinho de compras</h1>
      <CartItemTable data={cart.items} />
    </>
  );
}
