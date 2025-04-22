"use client";
import { ComponentProps } from "react";
import { redirect } from "next/navigation";

import { TableRow } from "@/components/ui/table";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { cn } from "@/lib/utils";
import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";
import { RenderIfMounted } from "@/components/common/render-if-mounted";
import { ProductCell } from "@/components/cart/table/item-row/product-cell";
import { PriceCell } from "@/components/cart/table/item-row/price-cell";
import { QuantityActionCell } from "@/components/cart/table/item-row/quantity-action-cell";

type Props = ComponentProps<typeof TableRow> &
  Pick<
    CartItemEntity,
    "image" | "name" | "price" | "productId" | "slug" | "quantity"
  >;

export const CartTableItemRow = ({
  image,
  name,
  price,
  productId,
  slug,
  quantity,
  className,
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

  const handleClick = () => {
    redirect(PRODUCT_DETAIL_PATH(slug));
  };

  return (
    <RenderIfMounted>
      <TableRow
        className={cn(
          "cursor-pointer transition-colors duration-200",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <ProductCell
          imageAlt={`Imagem do produto ${name}`}
          imageSrc={image}
          name={name}
        />
        <PriceCell value={price} />
        <QuantityActionCell cartItem={cartItem} quantity={quantity} />
        <PriceCell className="text-right" value={totalPrice} />
      </TableRow>
    </RenderIfMounted>
  );
};
