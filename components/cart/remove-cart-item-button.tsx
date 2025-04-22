import { ComponentProps } from "react";
import { Trash2 } from "lucide-react";

import { ButtonBase } from "@/components/cart/button-base";

type Props = Omit<ComponentProps<typeof ButtonBase>, "children">;

export const RemoveCartItemButton = ({ ...props }: Props) => (
  <ButtonBase type="button" {...props}>
    <Trash2 className="h-4 w-4" /> Remover
  </ButtonBase>
);
