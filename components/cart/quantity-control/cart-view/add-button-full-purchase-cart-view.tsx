import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { AddToCartButtonFull } from "@/components/cart/add-to-cart-button-full";

type Props = Omit<ComponentProps<"button">, "children">;

export const AddToCartButtonFullCartView = ({
  className,
  disabled,
  ...props
}: Props) => (
  <AddToCartButtonFull
    disabled={disabled}
    className={cn(
      disabled
        ? "border-gray-400 text-gray-400 bg-gray-100 cursor-not-allowed"
        : "border border-green-600 hover:text-green-50 hover:bg-green-700 text-green-600 bg-green-100 mt-3 mb-2",
      className
    )}
    {...props}
  />
);
