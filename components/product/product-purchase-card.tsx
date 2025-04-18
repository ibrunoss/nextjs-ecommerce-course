import { HTMLAttributes } from "react";

import { ProductPrice } from "@/components/product/product-price";
import { Card, CardContent } from "@/components/ui/card";
import { Render } from "@/components/common/render";
import { Badge } from "@/components/ui/badge";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemQuantityActionCartIcon } from "@/components/cart/item-quantity-action/cart-icon/cart-item-quantity-action-cart-icon";

export type ProductPurchaseCardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> &
  Pick<CartItemEntity, "image" | "name" | "price" | "productId" | "slug"> & {
    isAvailable: boolean;
    quantityInCart: number;
  };

export const ProductPurchaseCard = ({
  image,
  isAvailable,
  name,
  price,
  productId,
  slug,
  quantityInCart,
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
              <CartItemQuantityActionCartIcon
                quantity={quantityInCart}
                cartItem={cartItem}
              />
            </div>
          </Render>
        </CardContent>
      </Card>
    </div>
  );
};
