"use client";
import { ComponentProps } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { ProductPrice } from "@/components/product/product-price";
import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { CartItemQuantityActionPill } from "./item-quantity-action/pill/cart-item-quantity-action-pill";
import { cn } from "@/lib/utils";
import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";
import { RenderIfMounted } from "../common/render-if-mounted";
import { X } from "lucide-react";

type Props = ComponentProps<"tr"> &
  Pick<
    CartItemEntity,
    "image" | "name" | "price" | "productId" | "slug" | "quantity"
  >;

export const CartItemRow = ({
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

  const handleClick = () => {
    redirect(PRODUCT_DETAIL_PATH(slug));
  };
  const stopPropagation = (e: { stopPropagation(): void }) => {
    e.stopPropagation();
  };
  return (
    <RenderIfMounted>
      <tr
        className={cn(
          "border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <td className="p-2 w-20">
          <Image
            alt={`Imagem do produto ${name}`}
            src={image}
            height={64}
            width={64}
          />
        </td>
        <td>{name}</td>
        <td className="text-center">
          <ProductPrice
            currencySymbol={price.currencySymbol}
            fractionalPart={price.fractionalPart.numericValue}
            fractionalSymbol={price.fractionalSymbol}
            integerPart={price.integerPart.numericValue}
          />
        </td>
        <td className="w-8" onClick={stopPropagation}>
          <CartItemQuantityActionPill
            skipSuccessToast
            cartItem={{
              image,
              name,
              price,
              productId,
              slug,
              quantity: 1,
            }}
            quantity={quantity}
          />
        </td>
        <td className="text-center">
          <ProductPrice
            currencySymbol={totalPrice.currencySymbol}
            fractionalPart={totalPrice.fractionalPart.numericValue}
            fractionalSymbol={totalPrice.fractionalSymbol}
            integerPart={totalPrice.integerPart.numericValue}
          />
        </td>
        <td className="text-center pr-2">
          <button
            className="text-destructive hover:text-red-700 transition-colors duration-200"
            onClick={stopPropagation}
          >
            <X />
          </button>
        </td>
      </tr>
    </RenderIfMounted>
  );
};
