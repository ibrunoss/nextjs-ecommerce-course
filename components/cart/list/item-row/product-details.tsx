import Image from "next/image";

import { CurrencyEntity } from "@/domain/entities/currency.entity";

type Props = {
  brand: string;
  category: string;
  imageAlt: string;
  imageSrc: string;
  price: CurrencyEntity;
};
export const ProductDetails = ({
  brand,
  category,
  imageAlt,
  imageSrc,
  price,
}: Props) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <Image alt={imageAlt} src={imageSrc} height={64} width={64} />
      </div>
      <div className="flex flex-col items-start justify-center col-span-2 sm:col-span-1">
        <span>
          <p className="text-gray-400 text-xs">{brand}</p>
          <p className="text-xs text-accent-foreground font-normal">
            {category}
          </p>
        </span>
        <div className="flex gap-1 items-center justify-center min-w-20">
          <span className="text-muted-foreground text-xs">Preço unitário</span>
          <span className="font-bold text-sm">{price.displayValue}</span>
        </div>
      </div>
    </>
  );
};
