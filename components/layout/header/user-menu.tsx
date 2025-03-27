import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { UserMenuTrigger } from "@/components/layout/header/user-menu-trigger";
import { UserMenuLabel } from "@/components/layout/header/user-menu-label";
import { UserMenuItemSignOut } from "@/components/layout/header/user-menu-item-sign-out";

export type UserMenuProps = {
  email: string;
  name: string;
  srcImage?: string;
};

export const UserMenu = ({ email, name, srcImage }: UserMenuProps) => {
  const firstInitial = name.charAt(0).toUpperCase();
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <UserMenuTrigger firstInitial={firstInitial} srcImage={srcImage} />
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <UserMenuLabel email={email} name={name} />
          <UserMenuItemSignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
