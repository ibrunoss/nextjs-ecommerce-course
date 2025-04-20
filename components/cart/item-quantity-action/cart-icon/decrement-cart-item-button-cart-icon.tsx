import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { DecrementCartItemButton } from "@/components/cart/decrement-cart-item-button";

type Props = Omit<ComponentProps<"button">, "children">;

export const DecrementCartItemButtonCartIcon = ({
  className,
  ...props
}: Props) => (
  <DecrementCartItemButton
    className={cn(
      "border border-destructive text-destructive bg-transparent hover:text-destructive hover:bg-red-50",
      className
    )}
    {...props}
  />
);
