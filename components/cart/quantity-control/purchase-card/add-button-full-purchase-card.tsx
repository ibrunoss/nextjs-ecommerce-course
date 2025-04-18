import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { AddToCartButtonFull } from "@/components/cart/add-to-cart-button-full";

type Props = Omit<ComponentProps<"button">, "children">;

export const AddToCartButtonFullPurchaseCard = ({
  className,
  ...props
}: Props) => (
  <AddToCartButtonFull
    className={cn(
      "border border-green-600 hover:text-green-50 hover:bg-green-700 text-green-600 bg-green-100 mt-3 mb-2",
      className
    )}
    {...props}
  />
);
