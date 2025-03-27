import { MobileMenu } from "@/components/layout/header/mobile-menu";
import { DesktopMenu } from "@/components/layout/header/desktop-menu";

export const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <DesktopMenu />
      <MobileMenu />
    </div>
  );
};
