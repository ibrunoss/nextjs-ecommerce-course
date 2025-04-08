import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { ProductPrice } from "@/components/product/product-price";
import { ProductEntity } from "@/domain/product.entities";

export type ProductDetailsProps = Pick<
  ProductEntity,
  "brand" | "category" | "description" | "name" | "price" | "rating" | "reviews"
> &
  Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const ProductDetails = ({
  brand,
  category,
  className,
  description,
  name,
  price,
  rating,
  reviews,
  ...props
}: ProductDetailsProps) => {
  return (
    <div className={cn("p-5", className)} {...props}>
      <div className="flex flex-col gap-6">
        <p>
          {brand} {category}
        </p>
        <h1 className="h3-bold">{name}</h1>
        <p>
          {rating} de {reviews} Avaliações
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <ProductPrice
            className="w-28 rounded-full bg-green-100 text-green-700 px-5 py-2"
            currencySymbol={price.currencySymbol}
            fractionalPart={price.fractionalPart.stringValue}
            fractionalSymbol={price.fractionalSymbol}
            integerPart={price.integerPart.stringValue}
          />
        </div>
      </div>
      <div className="mt-10">
        <p className="font-semibold">Descrição</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
