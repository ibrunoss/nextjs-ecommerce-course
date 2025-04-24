import { HTMLAttributes } from "react";

import { ProductPrice } from "@/components/product/product-price";
import { Card, CardContent } from "@/components/ui/card";
import { Render } from "@/components/common/render";
import { Badge } from "@/components/ui/badge";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartItemQuantityActionCartIcon } from "@/components/cart/item-quantity-action/cart-icon/cart-item-quantity-action-cart-icon";
import { ProductEntity } from "@/domain/entities/product.entity";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";

export type ProductPurchaseCardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  cartId: string;
  product: ProductEntity;
  quantityInCart: number;
};

export const ProductPurchaseCard = ({
  cartId,
  product,
  quantityInCart,
  ...props
}: ProductPurchaseCardProps) => {
  const cartItem: CartItemEntity = {
    id: crypto.randomUUID(),
    cartId,
    product,
    price: newCurrencyEntity(product.price.numericValue),
    productId: product.id,
    quantity: 1,
  };
  return (
    <div {...props}>
      <Card>
        <CardContent className="px-4">
          <div className="mb-2 flex justify-between">
            <div>Preço</div>
            <div>
              <ProductPrice
                currencySymbol={product.price.currencySymbol}
                fractionalPart={product.price.fractionalPart.numericValue}
                fractionalSymbol={product.price.fractionalSymbol}
                integerPart={product.price.integerPart.numericValue}
              />
            </div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Situação</div>
            <div>
              <Render
                when={product.isAvailable}
                fallback={<Badge variant="destructive">Fora de estoque</Badge>}
              >
                <Badge variant="outline">Em estoque</Badge>
              </Render>
            </div>
          </div>
          <Render when={product.isAvailable}>
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
