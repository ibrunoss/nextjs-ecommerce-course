import { ComponentProps } from "react";
import { Plus } from "lucide-react";

import { ButtonBase } from "@/components/cart/button-base";
import { cn } from "@/lib/utils";

type Props = Omit<ComponentProps<"button">, "children">;

export const AddToCartButtonFull = ({ className, ...props }: Props) => (
  <ButtonBase className={cn("w-full", className)} type="button" {...props}>
    <Plus /> Adicionar ao carrinho
  </ButtonBase>
);
