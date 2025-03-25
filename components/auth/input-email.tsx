import { Input } from "@/components/ui/input";
import { Label } from "@/components/auth/label";
import { signInDefaultValues } from "@/lib/constants/auth";

export const InputEmail = () => {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={signInDefaultValues.email}
        required
      />
    </div>
  );
};
