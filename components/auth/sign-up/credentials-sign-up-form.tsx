"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { signUpWithCredentials } from "@/lib/actions/user.actions";
import { SignUpButton } from "@/components/auth/sign-up/sign-up-button";
import { SignUpPrompt } from "@/components/auth/sign-up/sign-up-prompt";
import { SubmitFeedback } from "@/components/auth/submit-feedback";
import { EmailField } from "@/components/auth/email-field";
import { PasswordField } from "@/components/auth/password-field";
import { NameField } from "@/components/auth/name-field";
import { ConfirmPasswordField } from "@/components/auth/confirm-password-field";
import { signUpDefaultValues } from "@/lib/constants/auth";
import { initialActionState } from "@/lib/actions/utils.actions";

export const CredentialsSignUpForm = () => {
  const [data, action] = useActionState(
    signUpWithCredentials,
    initialActionState
  );

  let errorMessage = "";

  if (!data.success) {
    errorMessage = data.errors.map((erro) => erro.message).join(". ");
  }

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <NameField defaultValue={signUpDefaultValues.name} />
        <EmailField defaultValue={signUpDefaultValues.email} />
        <PasswordField defaultValue={signUpDefaultValues.password} />
        <ConfirmPasswordField
          defaultValue={signUpDefaultValues.confirmPassword}
        />
        <SignUpButton />
        <SubmitFeedback error={!data.success} message={errorMessage} />
        <SignUpPrompt />
      </div>
    </form>
  );
};
