import { Table } from "@/components/ui/table";
import { CartTableHeader } from "@/components/cart/table/cart-table-header";
import { CartTableBody } from "@/components/cart/table/cart-table-body";
import { CartTableFooter } from "@/components/cart/table/cart-table-footer";
import { CartEntity } from "@/domain/entities/cart.entity";

type Props = {
  data: CartEntity;
};
export const CartTable = ({ data }: Props) => {
  const footerPrice = {
    items: data.itemsPrice,
    shipping: data.shippingPrice,
    total: data.totalPrice,
    tax: data.taxPrice,
  };

  return (
    <Table className="table-auto w-full border border-gray-300">
      <CartTableHeader />
      <CartTableBody cartItems={data.items} />
      <CartTableFooter price={footerPrice} />
    </Table>
  );
};
