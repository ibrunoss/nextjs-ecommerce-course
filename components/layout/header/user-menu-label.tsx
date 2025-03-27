import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";

export type UserMenuLabelProps = {
  email: string;
  name: string;
};

export const UserMenuLabel = ({ email, name }: UserMenuLabelProps) => {
  return (
    <DropdownMenuLabel className="font-normal">
      <div className="flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground leading-none">{email}</p>
      </div>
    </DropdownMenuLabel>
  );
};
