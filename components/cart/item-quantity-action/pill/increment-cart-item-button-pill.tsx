import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { AddToCartButtonCompact } from "@/components/cart/add-to-cart-button-compact";

type Props = Omit<ComponentProps<"button">, "children">;

export const IncrementCartItemButtonPill = ({ className, ...props }: Props) => (
  <AddToCartButtonCompact
    className={cn(
      "text-green-600 bg-transparent hover:text-green-600 border-l-2 hover:bg-green-100 rounded-xl rounded-bl-none rounded-tl-none",
      className
    )}
    {...props}
  />
);
