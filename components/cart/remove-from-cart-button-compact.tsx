import { ComponentProps } from "react";
import { Minus } from "lucide-react";

import { ButtonBase } from "@/components/cart/button-base";

type Props = Omit<ComponentProps<"button">, "children">;

export const RemoveFromCartButtonCompact = ({ ...props }: Props) => (
  <ButtonBase type="button" {...props}>
    <Minus className="h-4 w-4" />
  </ButtonBase>
);
