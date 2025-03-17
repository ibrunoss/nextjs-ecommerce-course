import { MainHeader } from "@/components/layout/header/main-header";
import { CartButton } from "./cart-button";
import { AuthButton } from "./auth-button";

export const ShopHeader = () => {
  return (
    <MainHeader>
      <div className="space-x-2">
        <CartButton />
        <AuthButton />
      </div>
    </MainHeader>
  );
};
