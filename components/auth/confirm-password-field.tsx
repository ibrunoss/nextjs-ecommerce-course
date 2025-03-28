import { Label } from "@/components/common/label";
import { PasswordInput } from "@/components/common/password-input";

export type ConfirmPasswordFieldProps = {
  defaultValue?: string;
  controlled?: {
    state: boolean;
    onClick: () => void;
  };
};

export const ConfirmPasswordField = ({
  controlled,
  defaultValue,
}: ConfirmPasswordFieldProps) => {
  return (
    <div>
      <Label htmlFor="confirmPassword">Confirme a senha</Label>
      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        autoComplete="password"
        controlled={controlled}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};
