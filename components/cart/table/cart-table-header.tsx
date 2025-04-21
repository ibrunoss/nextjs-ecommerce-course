import { ComponentProps } from "react";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = ComponentProps<typeof TableHeader>;

export const CartTableHeader = (props: Props) => {
  return (
    <TableHeader {...props}>
      <TableRow>
        <TableHead colSpan={2}>Produto</TableHead>
        <TableHead>Preço unitário</TableHead>
        <TableHead className="text-center">Quantidade</TableHead>
        <TableHead colSpan={2}>Subtotal</TableHead>
      </TableRow>
    </TableHeader>
  );
};
