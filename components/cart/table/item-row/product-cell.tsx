import { ComponentProps } from "react";
import Image from "next/image";

import { TableCell } from "@/components/ui/table";

type Props = ComponentProps<typeof TableCell> & {
  name: string;
  imageSrc: string;
  imageAlt: string;
};

export const ProductCell = ({ imageSrc, imageAlt, name, ...props }: Props) => {
  return (
    <TableCell {...props}>
      <div className="flex flex-col items-center justify-center">
        <Image
          className="min-h-24 min-w-24"
          alt={imageAlt}
          src={imageSrc}
          height={64}
          width={64}
        />
        {name}
      </div>
    </TableCell>
  );
};
