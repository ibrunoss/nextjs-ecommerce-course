import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus } from "lucide-react";

type Props = Omit<ComponentProps<"button">, "children">;

export const RemoveFromCartButtonCompact = ({ className, ...props }: Props) => (
  <Button
    className={cn(
      "border border-destructive text-destructive bg-transparent hover:text-destructive hover:bg-red-50",
      className
    )}
    type="button"
    {...props}
  >
    <Minus className="h-4 w-4" />
  </Button>
);
