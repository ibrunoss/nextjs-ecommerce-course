"use client";
import { useState } from "react";

import { PasswordField } from "@/components/auth/password-field";
import { ConfirmPasswordField } from "@/components/auth/confirm-password-field";

export type PasswordsFieldsProps = {
  defaultValuePassword?: string;
  defaultValueConfirmPassword?: string;
};

export const PasswordsFields = ({
  defaultValueConfirmPassword,
  defaultValuePassword,
}: PasswordsFieldsProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const toggle = () => {
    setIsHidden((prevState) => !prevState);
  };
  const controlled = {
    state: isHidden,
    onClick: toggle,
  };
  return (
    <>
      <PasswordField
        defaultValue={defaultValuePassword}
        controlled={controlled}
      />
      <ConfirmPasswordField
        defaultValue={defaultValueConfirmPassword}
        controlled={controlled}
      />
    </>
  );
};
