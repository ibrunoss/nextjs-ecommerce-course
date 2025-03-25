import { Input } from "@/components/ui/input";
import { Label } from "@/components/auth/label";
import { signInDefaultValues } from "@/lib/constants/auth";

export const InputPassword = () => {
  return (
    <div>
      <Label htmlFor="password">Senha</Label>
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete="password"
        defaultValue={signInDefaultValues.password}
        required
      />
    </div>
  );
};
