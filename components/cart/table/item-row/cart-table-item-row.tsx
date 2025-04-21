"use client";
import { ComponentProps } from "react";
import { redirect } from "next/navigation";

import { TableCell, TableRow } from "@/components/ui/table";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { cn } from "@/lib/utils";
import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";
import { RenderIfMounted } from "@/components/common/render-if-mounted";
import { ImageCell } from "@/components/cart/table/item-row/image-cell";
import { PriceCell } from "@/components/cart/table/item-row/price-cell";
import { QuantityActionCell } from "@/components/cart/table/item-row/quantity-action-cell";
import { RemoveActionCell } from "@/components/cart/table/item-row/remove-action-cell";

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
        <ImageCell imageAlt={`Imagem do produto ${name}`} imageSrc={image} />
        <TableCell>{name}</TableCell>
        <PriceCell value={price} />
        <QuantityActionCell cartItem={cartItem} quantity={quantity} />
        <PriceCell className="" value={totalPrice} />
        <RemoveActionCell cartItem={cartItem} />
      </TableRow>
    </RenderIfMounted>
  );
};
