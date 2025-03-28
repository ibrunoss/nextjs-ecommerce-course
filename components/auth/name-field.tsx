import { Input } from "@/components/ui/input";
import { Label } from "@/components/common/label";

export type NameFieldProps = {
  defaultValue?: string;
};

export const NameField = ({ defaultValue }: NameFieldProps) => {
  return (
    <div>
      <Label htmlFor="name">Nome</Label>
      <Input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};
