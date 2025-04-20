import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { IncrementCartItemButton } from "@/components/cart/increment-cart-item-button";

type Props = Omit<ComponentProps<"button">, "children">;

export const IncrementCartItemButtonPill = ({ className, ...props }: Props) => (
  <IncrementCartItemButton
    className={cn(
      "text-green-600 bg-transparent hover:text-green-600 border-l-2 hover:bg-green-100 rounded-xl rounded-bl-none rounded-tl-none",
      className
    )}
    {...props}
  />
);
