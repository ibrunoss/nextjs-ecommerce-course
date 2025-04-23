import { ComponentProps } from "react";
import Link from "next/link";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import {
  CurrencyEntity,
  newCurrencyEntity,
} from "@/domain/entities/currency.entity";
import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";
import { QuantityAction } from "@/components/cart/list/item-row/quantity-action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/components/cart/list/item-row/product-details";
import { TotalPriceDisplay } from "@/components/cart/list/item-row/total-price-display";

type Props = ComponentProps<"div"> & {
  image: string;
  name: string;
  brand: string;
  category: string;
  price: CurrencyEntity;
  productId: string;
  slug: string;
  quantity: number;
};

export const CartListItemRow = ({
  brand,
  category,
  image,
  name,
  price,
  productId,
  slug,
  quantity,
  ...props
}: Props) => {
  const totalPrice = newCurrencyEntity(price.numericValue * quantity);
  const cartItem: CartItemEntity = {
    image,
    name,
    price,
    productId,
    slug,
    quantity: 1,
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>
          <Link
            href={PRODUCT_DETAIL_PATH(slug)}
            className="font-semibold leading-none tracking-tight"
          >
            {name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-[64px_3fr_2fr_1fr] gap-4">
        <ProductDetails
          brand={brand}
          category={category}
          imageAlt={`Imagem do produto ${name}`}
          imageSrc={image}
          price={price}
        />
        <QuantityAction cartItem={cartItem} quantity={quantity} />
        <TotalPriceDisplay value={totalPrice} />
      </CardContent>
    </Card>
  );
};
