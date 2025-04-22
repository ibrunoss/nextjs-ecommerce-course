import { ComponentProps } from "react";

import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof TableCell>;

export const FooterValueCell = ({
  children,
  className,
  colSpan,
  ...props
}: Props) => {
  return (
    <TableCell
      className={cn("text-right pl-0 ml-0", className)}
      colSpan={colSpan ?? 2}
      {...props}
    >
      {children}
    </TableCell>
  );
};
