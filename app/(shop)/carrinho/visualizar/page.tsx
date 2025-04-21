import { CartTable } from "@/components/cart/table/cart-table";
import { Render } from "@/components/common/render";
import { newCartEntity } from "@/domain/entities/cart.entity";
import { getCart } from "@/lib/actions/cart.actions/get-cart.action.ts";
import { initialActionDataState } from "@/lib/actions/utils.actions";
import { HOME_PATH } from "@/lib/constants/routes";
import Link from "next/link";

export const metadata = {
  title: "Visualizar Carrinho",
  description: "Visualizando os itens do carrinho de compras",
};

export default async function CartViewPage() {
  const { data: cart } = await getCart(initialActionDataState(newCartEntity()));
  return (
    <>
      <h1 className="py-4 h2-bold">Carrinho de compras</h1>
      <Render
        when={cart.items.length > 0}
        fallback={
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <p>
              Carrinho vazio.{" "}
              <Link className="underline hover:text-amber-400" href={HOME_PATH}>
                Ir às compras
              </Link>
            </p>
          </div>
        }
      >
        <CartTable data={cart} />
      </Render>
    </>
  );
}
