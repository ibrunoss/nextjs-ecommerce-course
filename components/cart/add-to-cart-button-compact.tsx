import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type Props = Omit<ComponentProps<"button">, "children">;

export const AddToCartButtonCompact = ({ className, ...props }: Props) => (
  <Button
    className={cn(
      "border border-green-600 text-green-600 bg-transparent hover:text-green-600 hover:bg-green-100",
      className
    )}
    type="button"
    {...props}
  >
    <Plus className="h-4 w-4" />
  </Button>
);
