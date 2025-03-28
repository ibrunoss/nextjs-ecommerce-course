import { Label } from "@/components/common/label";
import { PasswordInput } from "@/components/common/password-input";

export type PasswordFieldProps = {
  defaultValue?: string;
  controlled?: {
    state: boolean;
    onClick: () => void;
  };
};

export const PasswordField = ({
  controlled,
  defaultValue,
}: PasswordFieldProps) => {
  return (
    <div>
      <Label htmlFor="password">Senha</Label>
      <PasswordInput
        id="password"
        name="password"
        autoComplete="password"
        defaultValue={defaultValue}
        controlled={controlled}
        required
      />
    </div>
  );
};
