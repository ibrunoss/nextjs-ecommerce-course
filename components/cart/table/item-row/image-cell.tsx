import { ComponentProps } from "react";
import Image from "next/image";

import { TableCell } from "@/components/ui/table";

type Props = ComponentProps<typeof TableCell> & {
  imageSrc: string;
  imageAlt: string;
};

export const ImageCell = ({ imageSrc, imageAlt, ...props }: Props) => {
  return (
    <TableCell {...props}>
      <Image alt={imageAlt} src={imageSrc} height={64} width={64} />
    </TableCell>
  );
};
