import { CoreHeader } from "@/components/header/core-header";
import { HeaderMenu } from "@/components/header/menu/header-menu";
import { Logo } from "@/components/header/logo";

export const ShopHeader = () => {
  return (
    <CoreHeader wrapperProps={{ className: "flex-between" }}>
      <div className="flex-start">
        <Logo />
      </div>
      <HeaderMenu />
    </CoreHeader>
  );
};
