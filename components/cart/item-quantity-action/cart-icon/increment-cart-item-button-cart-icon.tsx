import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { IncrementCartItemButton } from "@/components/cart/increment-cart-item-button";

type Props = Omit<ComponentProps<"button">, "children">;

export const IncrementCartItemButtonCartIcon = ({
  className,
  ...props
}: Props) => (
  <IncrementCartItemButton
    className={cn(
      "border border-green-600 text-green-600 bg-transparent hover:text-green-600 hover:bg-green-100",
      className
    )}
    {...props}
  />
);
