import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { RemoveFromCartButtonCompact } from "@/components/cart/remove-from-cart-button-compact";

type Props = Omit<ComponentProps<"button">, "children">;

export const RemoveButtonCompactPurchaseCard = ({
  className,
  ...props
}: Props) => (
  <RemoveFromCartButtonCompact
    className={cn(
      "border border-destructive text-destructive bg-transparent hover:text-destructive hover:bg-red-50",
      className
    )}
    {...props}
  />
);
