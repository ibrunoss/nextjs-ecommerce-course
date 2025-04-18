import { ComponentProps } from "react";
import { Minus } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = Omit<ComponentProps<"button">, "children">;

export const RemoveFromCartButtonCompact = ({ ...props }: Props) => (
  <Button type="button" {...props}>
    <Minus className="h-4 w-4" />
  </Button>
);
