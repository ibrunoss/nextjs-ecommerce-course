import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type EmailFieldProps = {
  defaultValue?: string;
};

export const EmailField = ({ defaultValue }: EmailFieldProps) => {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};
