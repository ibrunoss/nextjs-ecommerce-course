import { ProductPrice } from "@/components/product/product-price";
import { CurrencyEntity } from "@/domain/entities/currency.entity";

type Props = {
  value: CurrencyEntity;
};
export const TotalPriceDisplay = ({ value }: Props) => {
  return (
    <div className="flex flex-col items-end md:items-center justify-end md:justify-start col-span-2 md:col-span-1">
      <span className="font-medium text-xs">Preço à vista:</span>
      <ProductPrice
        className="text-orange-400 font-bold"
        currencySymbol={value.currencySymbol}
        fractionalPart={value.fractionalPart.numericValue}
        fractionalSymbol={value.fractionalSymbol}
        integerPart={value.integerPart.numericValue}
      />
    </div>
  );
};
