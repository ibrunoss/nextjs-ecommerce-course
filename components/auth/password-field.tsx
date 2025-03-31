import {
  PasswordInputField,
  PasswordInputFieldProps,
} from "@/components/common/password-input-field";

export type PasswordFieldProps = PasswordInputFieldProps;

export const PasswordField = (props: PasswordFieldProps) => {
  return (
    <PasswordInputField
      label="Senha"
      id="password"
      name="password"
      autoComplete="password"
      required
      {...props}
    />
  );
};
