import { MobileMenu } from "@/components/layout/header/menu/mobile-menu";
import { DesktopMenu } from "@/components/layout/header/menu/desktop-menu";

export const HeaderMenu = () => {
  return (
    <div className="flex justify-end gap-3">
      <DesktopMenu />
      <MobileMenu />
    </div>
  );
};
