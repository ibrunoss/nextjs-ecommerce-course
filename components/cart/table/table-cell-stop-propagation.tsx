import { ComponentProps } from "react";

import { TableCell } from "@/components/ui/table";

type Props = ComponentProps<typeof TableCell>;

export const TableCellStopPropagation = ({
  children,
  onClick,
  ...props
}: Props) => {
  return (
    <TableCell
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </TableCell>
  );
};
