import { ComponentProps } from "react";
import { Plus } from "lucide-react";

import { ButtonBase } from "@/components/cart/button-base";

type Props = Omit<ComponentProps<"button">, "children">;

export const IncrementCartItemButton = ({ ...props }: Props) => (
  <ButtonBase type="button" {...props}>
    <Plus className="h-4 w-4" />
  </ButtonBase>
);
