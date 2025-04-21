import { ComponentProps } from "react";

import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof TableCell>;

export const FooterLabelCell = ({ children, className, ...props }: Props) => {
  return (
    <TableCell
      className={cn("text-muted-foreground", className)}
      colSpan={3}
      {...props}
    >
      {children}
    </TableCell>
  );
};
