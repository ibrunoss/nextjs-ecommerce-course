import { ComponentProps } from "react";

import { TableFooter } from "@/components/ui/table";
import { CurrencyEntity } from "@/domain/entities/currency.entity";
import { cn } from "@/lib/utils";
import { Render } from "@/components/common/render";
import { CartTableFooterRow } from "@/components/cart/table/footer-row/cart-table-footer-row";

type Props = ComponentProps<typeof TableFooter> & {
  price: {
    discount?: CurrencyEntity;
    items: CurrencyEntity;
    shipping?: CurrencyEntity;
    total: CurrencyEntity;
  };
};
export const CartTableFooter = ({ className, price, ...props }: Props) => {
  const { discount, items, shipping, total } = price;
  const hasDiscount = Boolean(discount && discount.numericValue > 0);
  const hasShippingPrice = shipping !== undefined && shipping.numericValue > 0;
  const shippingDisplay =
    shipping?.numericValue === 0 ? "Grátis" : shipping?.displayValue;

  return (
    <TableFooter className={cn("text-2xl font-bold", className)} {...props}>
      <Render when={shippingDisplay !== undefined}>
        <CartTableFooterRow label="Frete" value={shippingDisplay} />
      </Render>

      <Render when={hasDiscount || hasShippingPrice}>
        <CartTableFooterRow
          label="Total dos produtos"
          value={items.displayValue}
        />
      </Render>

      <Render when={hasDiscount}>
        <CartTableFooterRow label="Desconto" value={discount?.displayValue} />
      </Render>
      <CartTableFooterRow label="Valor total" value={total.displayValue} />
    </TableFooter>
  );
};
