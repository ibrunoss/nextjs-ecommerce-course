import { ComponentProps, ReactNode } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { Label as LabelUI } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type LabelProps = Omit<
  ComponentProps<typeof LabelPrimitive.Root>,
  "children"
> & {
  children: ReactNode;
};

export const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <LabelUI className={cn("mb-1", className)} {...props}>
      {children}
    </LabelUI>
  );
};
