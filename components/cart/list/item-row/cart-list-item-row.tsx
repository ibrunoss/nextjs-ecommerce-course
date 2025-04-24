import { ComponentProps } from "react";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { QuantityAction } from "@/components/cart/list/item-row/quantity-action";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDetails } from "@/components/cart/list/item-row/product-details";
import { TotalPriceDisplay } from "@/components/cart/list/item-row/total-price-display";
import { ProductEntity } from "@/domain/entities/product.entity";

type Props = ComponentProps<"div"> & {
  cartId: string;
  product: ProductEntity;
  quantity: number;
};

export const CartListItemRow = ({
  cartId,
  quantity,
  product,
  ...props
}: Props) => {
  const totalPrice = newCurrencyEntity(product.price.numericValue * quantity);
  const cartItem: CartItemEntity = {
    id: crypto.randomUUID(),
    cartId,
    product,
    price: product.price,
    productId: product.id,
    quantity: 1,
  };

  return (
    <Card {...props}>
      <CardContent className="grid grid-cols-[64px_3fr_2fr_1fr] gap-4">
        <ProductDetails
          brand={product.brand}
          category={product.category}
          imageAlt={`Imagem do produto ${product.name}`}
          imageSrc={product.images[0]}
          name={product.name}
          price={product.price}
          slug={product.slug}
        />
        <QuantityAction cartItem={cartItem} quantity={quantity} />
        <TotalPriceDisplay value={totalPrice} />
      </CardContent>
    </Card>
  );
};
