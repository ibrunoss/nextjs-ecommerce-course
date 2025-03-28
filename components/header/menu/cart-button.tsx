import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CartButton = () => {
  return (
    <Button asChild variant="ghost">
      <Link href="/carrinho">
        <ShoppingCart /> Carrinho
      </Link>
    </Button>
  );
};
