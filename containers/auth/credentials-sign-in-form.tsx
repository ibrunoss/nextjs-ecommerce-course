"use client";
import { signInWithCredentials } from "@/lib/actions/auth.actions/sign-in-with-credentials.action";
import { initialActionState } from "@/lib/actions/utils.actions";
import { signInDefaultValues } from "@/lib/constants/auth";
import { useCredentialsForm } from "@/hooks/use-credentials-form";
import { SignInForm } from "@/components/auth/sign-in/sign-in-form";

export const CredentialsSignInForm = () => {
  const { action, callbackUrl, errorMessage, showError } = useCredentialsForm(
    signInWithCredentials,
    initialActionState,
    (res) => (!res.success ? res.message.description : "")
  );

  return (
    <SignInForm
      action={action}
      defaultValues={signInDefaultValues}
      callbackUrl={callbackUrl}
      showError={showError}
      errorMessage={errorMessage}
    />
  );
};
