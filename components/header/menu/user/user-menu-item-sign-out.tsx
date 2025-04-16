import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/auth.actions/sign-out-user.action";

export const UserMenuItemSignOut = () => {
  return (
    <DropdownMenuItem className="p-0 mb-1">
      <form action={signOutUser}>
        <Button variant="ghost" className="w-full py-4 px-2 h-4 justify-start">
          Sair
        </Button>
      </form>
    </DropdownMenuItem>
  );
};
