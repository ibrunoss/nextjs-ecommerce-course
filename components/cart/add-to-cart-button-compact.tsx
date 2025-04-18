import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = Omit<ComponentProps<"button">, "children">;

export const AddToCartButtonCompact = ({ ...props }: Props) => (
  <Button type="button" {...props}>
    <Plus className="h-4 w-4" />
  </Button>
);
