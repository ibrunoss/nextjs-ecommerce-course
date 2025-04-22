import { ComponentProps, ReactNode } from "react";

import { TableRow } from "@/components/ui/table";
import { FooterLabelCell } from "@/components/cart/table/footer-row/footer-label-cell";
import { FooterValueCell } from "@/components/cart/table/footer-row/footer-value-cell";

type Props = Omit<ComponentProps<typeof TableRow>, "children"> & {
  colSpanLabel?: number;
  colSpanValue?: number;
  label: ReactNode;
  value: ReactNode;
};

export const CartTableFooterRow = ({
  label,
  value,
  colSpanLabel,
  colSpanValue,
  ...props
}: Props) => {
  return (
    <TableRow {...props}>
      <FooterLabelCell colSpan={colSpanLabel}>{label}</FooterLabelCell>
      <FooterValueCell colSpan={colSpanValue}>{value}</FooterValueCell>
    </TableRow>
  );
};
