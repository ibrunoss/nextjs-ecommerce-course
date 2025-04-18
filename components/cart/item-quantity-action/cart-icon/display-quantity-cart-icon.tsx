import { ShoppingCart } from "lucide-react";
import React from "react";

type Props = {
  quantity: number;
};

export const DisplayQuantityCartIcon = ({ quantity }: Props) => {
  return (
    <div className="rounded-lg text-sm font-semibold p-1 relative">
      <ShoppingCart className="w-12 h-12 text-muted-foreground" />
      <p className="rounded-full bg-green-50 min-w-8 h-auto text-center text-sm text-green-600 font-semibold absolute top-0 right-0 p-1">
        {quantity}
      </p>
    </div>
  );
};
