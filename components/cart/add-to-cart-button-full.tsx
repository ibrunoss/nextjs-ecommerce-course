import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type Props = Omit<ComponentProps<"button">, "children">;

export const AddToCartButtonFull = ({ className, ...props }: Props) => (
  <Button className={cn("w-full", className)} type="button" {...props}>
    <Plus /> Adicionar ao carrinho
  </Button>
);
