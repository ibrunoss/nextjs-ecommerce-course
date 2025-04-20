import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { AddCartItemButton } from "@/components/cart/add-cart-item-button";

type Props = Omit<ComponentProps<"button">, "children">;

export const AddCartItemButtonCartIcon = ({ className, ...props }: Props) => (
  <AddCartItemButton
    className={cn(
      "border border-green-600 hover:text-green-50 hover:bg-green-700 text-green-600 bg-green-100 mt-3 mb-2",
      className
    )}
    {...props}
  />
);
