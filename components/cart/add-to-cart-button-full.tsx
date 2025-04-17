import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type Props = Omit<ComponentProps<"button">, "children">;

export const AddToCartButtonFull = ({ className, ...props }: Props) => (
  <Button
    className={cn(
      "w-full border border-green-600 hover:text-green-50 hover:bg-green-700 text-green-600 bg-green-100",
      className
    )}
    type="button"
    {...props}
  >
    <Plus /> Adicionar ao carrinho
  </Button>
);
