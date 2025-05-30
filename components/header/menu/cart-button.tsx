import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CART_VIEW_PATH } from "@/lib/constants/routes";

export const CartButton = () => {
  return (
    <Button asChild variant="ghost">
      <Link href={CART_VIEW_PATH}>
        <ShoppingCart /> Carrinho
      </Link>
    </Button>
  );
};
