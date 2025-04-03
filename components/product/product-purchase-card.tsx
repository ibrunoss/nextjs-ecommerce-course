import { HTMLAttributes } from "react";

import { AddProductToCart } from "@/components/product/add-product-to-cart";
import { ProductPrice } from "@/components/product/product-price";
import { Card, CardContent } from "@/components/ui/card";
import { Render } from "@/components/common/render";
import { Badge } from "@/components/ui/badge";
import { CartItemEntity } from "@/domain/cart.entities";

export type ProductPurchaseCardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> &
  Pick<CartItemEntity, "image" | "name" | "price" | "productId" | "slug"> & {
    isAvailable: boolean;
  };

export const ProductPurchaseCard = ({
  image,
  isAvailable,
  name,
  price,
  productId,
  slug,
  ...props
}: ProductPurchaseCardProps) => {
  const cartItem: CartItemEntity = {
    image,
    name,
    price,
    productId,
    quantity: 1,
    slug,
  };
  return (
    <div {...props}>
      <Card>
        <CardContent className="px-4">
          <div className="mb-2 flex justify-between">
            <div>Preço</div>
            <div>
              <ProductPrice
                currencySymbol={price.currencySymbol}
                fractionalPart={price.fractionalPart.stringValue}
                fractionalSymbol={price.fractionalSymbol}
                integerPart={price.integerPart.stringValue}
              />
            </div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Situação</div>
            <div>
              <Render
                when={isAvailable}
                fallback={<Badge variant="destructive">Fora de estoque</Badge>}
              >
                <Badge variant="outline">Em estoque</Badge>
              </Render>
            </div>
          </div>
          <Render when={isAvailable}>
            <div className="flex-center">
              <AddProductToCart cartItem={cartItem} />
            </div>
          </Render>
        </CardContent>
      </Card>
    </div>
  );
};
