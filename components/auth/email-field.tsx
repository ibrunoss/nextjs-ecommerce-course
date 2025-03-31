import { InputField, InputFieldProps } from "@/components/common/input-field";

export type EmailFieldProps = InputFieldProps;

export const EmailField = (props: EmailFieldProps) => {
  return (
    <InputField
      {...props}
      label="E-mail"
      id="email"
      name="email"
      type="email"
      autoComplete="email"
      required
    />
  );
};
