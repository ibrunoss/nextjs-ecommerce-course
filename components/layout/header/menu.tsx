import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthButton } from "./auth-button";
import { CartButton } from "./cart-button";
import { ModeToggle } from "./mode-toggle";
import { EllipsisVertical } from "lucide-react";

export const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <CartButton />
        <AuthButton />
      </nav>
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
              <AuthButton />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
