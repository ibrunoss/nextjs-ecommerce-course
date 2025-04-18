import { ReactNode } from "react";

type Props = {
  quantity: ReactNode;
};

export const DisplayQuantityPill = ({ quantity }: Props) => {
  return (
    <div className="flex items-center justify-center text-sm font-semibold min-w-12 ">
      {quantity}
    </div>
  );
};
