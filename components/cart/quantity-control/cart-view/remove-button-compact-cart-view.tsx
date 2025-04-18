import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { RemoveFromCartButtonCompact } from "@/components/cart/remove-from-cart-button-compact";

type Props = Omit<ComponentProps<"button">, "children">;

export const RemoveButtonCompactCartView = ({ className, ...props }: Props) => (
  <RemoveFromCartButtonCompact
    className={cn(
      "text-destructive bg-transparent hover:text-destructive hover:bg-red-50 border-r-2 rounded-xl rounded-br-none rounded-tr-none",
      className
    )}
    {...props}
  />
);
