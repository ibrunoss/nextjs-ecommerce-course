import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"button">;

export const ButtonBase = ({ className, ...props }: Props) => (
  <Button
    className={cn(className, {
      "border-gray-400 text-gray-400 bg-gray-100 cursor-not-allowed":
        props.disabled,
    })}
    type="button"
    {...props}
  >
    {props.children}
  </Button>
);
