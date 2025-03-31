import { InputField, InputFieldProps } from "@/components/common/input-field";

export type NameFieldProps = InputFieldProps;

export const NameField = (props: NameFieldProps) => {
  return (
    <InputField
      {...props}
      label="Nome"
      id="name"
      name="name"
      type="text"
      autoComplete="name"
      required
    />
  );
};
