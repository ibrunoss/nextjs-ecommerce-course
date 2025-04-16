"use client";
import { signUpWithCredentials } from "@/lib/actions/user.actions";
import { signUpDefaultValues } from "@/lib/constants/auth";
import { initialActionState } from "@/lib/actions/utils.actions";
import { SignUpForm } from "@/components/auth/sign-up/sign-up-form";
import { useCredentialsForm } from "@/hooks/use-credentials-form";

export const CredentialsSignUpForm = () => {
  const { action, callbackUrl, errorMessage, showError } = useCredentialsForm(
    signUpWithCredentials,
    initialActionState,
    (res) =>
      !res.success
        ? res.errors.map((e) => e.message.description).join(". ")
        : ""
  );

  return (
    <SignUpForm
      action={action}
      defaultValues={signUpDefaultValues}
      callbackUrl={callbackUrl}
      errorMessage={errorMessage}
      showError={showError}
    />
  );
};
