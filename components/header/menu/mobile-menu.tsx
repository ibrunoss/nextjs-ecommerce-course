import { EllipsisVertical } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthButtonOrMenuButton } from "./auth-button-or-menu-button";
import { CartButton } from "@/components/header/menu/cart-button";
import { ModeToggle } from "@/components/header/menu/mode-toggle";

export const MobileMenu = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <EllipsisVertical />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-start gap-3 px-3">
            <ModeToggle />
            <CartButton />
            <AuthButtonOrMenuButton />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
