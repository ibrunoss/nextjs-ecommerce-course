import {
  PasswordInputField,
  PasswordInputFieldProps,
} from "@/components/common/password-input-field";

export type ConfirmPasswordFieldProps = PasswordInputFieldProps;

export const ConfirmPasswordField = (props: ConfirmPasswordFieldProps) => {
  return (
    <PasswordInputField
      label="Confirme a senha"
      id="confirmPassword"
      name="confirmPassword"
      autoComplete="password"
      required
      {...props}
    />
  );
};
