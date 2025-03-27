import { AuthButtonOrMenuButton } from "@/components/layout/header/auth-button-or-menu-button";
import { CartButton } from "@/components/layout/header/cart-button";
import { ModeToggle } from "@/components/layout/header/mode-toggle";

export const DesktopMenu = () => {
  return (
    <nav className="hidden md:flex w-full max-w-xs gap-1">
      <ModeToggle />
      <CartButton />
      <AuthButtonOrMenuButton />
    </nav>
  );
};
