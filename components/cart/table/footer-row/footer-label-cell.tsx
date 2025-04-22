import { ComponentProps } from "react";

import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof TableCell>;

export const FooterLabelCell = ({
  children,
  className,
  colSpan,
  ...props
}: Props) => {
  return (
    <TableCell
      className={cn("text-muted-foreground", className)}
      colSpan={colSpan ?? 2}
      {...props}
    >
      {children}
    </TableCell>
  );
};
