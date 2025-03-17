import { MainHeader } from "@/components/layout/header/main-header";
import { CartButton } from "./cart-button";
import { AuthButton } from "./auth-button";
import { ModeToggle } from "./mode-toggle";

export const ShopHeader = () => {
  return (
    <MainHeader>
      <div className="space-x-2">
        <ModeToggle />
        <CartButton />
        <AuthButton />
      </div>
    </MainHeader>
  );
};
