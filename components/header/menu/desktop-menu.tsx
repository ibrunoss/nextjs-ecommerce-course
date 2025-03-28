import { AuthButtonOrMenuButton } from "@/components/header/menu/auth-button-or-menu-button";
import { CartButton } from "@/components/header/menu/cart-button";
import { ModeToggle } from "@/components/header/menu/mode-toggle";

export const DesktopMenu = () => {
  return (
    <nav className="hidden md:flex w-full max-w-xs gap-1">
      <ModeToggle />
      <CartButton />
      <AuthButtonOrMenuButton />
    </nav>
  );
};
