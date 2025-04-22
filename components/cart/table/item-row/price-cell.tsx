import { ComponentProps } from "react";

import { TableCell } from "@/components/ui/table";
import { CurrencyEntity } from "@/domain/entities/currency.entity";
import { ProductPrice } from "@/components/product/product-price";

type Props = ComponentProps<typeof TableCell> & {
  value: CurrencyEntity;
};

export const PriceCell = ({ value, ...props }: Props) => {
  return (
    <TableCell {...props}>
      <ProductPrice
        currencySymbol={value.currencySymbol}
        fractionalPart={value.fractionalPart.numericValue}
        fractionalSymbol={value.fractionalSymbol}
        integerPart={value.integerPart.numericValue}
      />
    </TableCell>
  );
};
