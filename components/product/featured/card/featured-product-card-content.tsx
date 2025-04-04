import Link from "next/link";

import { Render } from "@/components/common/render";
import { ProductPrice } from "@/components/product/product-price";
import { CardContent } from "@/components/ui/card";

export type FeaturedProductCardContentProps = {
  link: string;
  price: number;
  rating: number;
  isAvailable: boolean;
  brand: string;
  name: string;
};

export const FeaturedProductCardContent = ({
  brand,
  isAvailable,
  link,
  name,
  price,
  rating,
}: FeaturedProductCardContentProps) => {
  return (
    <CardContent className="p-4 grid gap-4">
      <div className="text-xs">{brand}</div>
      <Link href={link}>
        <h2 className="text-sm font-medium">{name}</h2>
      </Link>
      <div className="flex-between gap-4">
        <p>Avaliação: {rating}</p>
        <Render
          when={isAvailable}
          fallback={<p className="text-destructive">Indisponível</p>}
        >
          <ProductPrice value={price} />
        </Render>
      </div>
    </CardContent>
  );
};
