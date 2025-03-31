"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { signInWithCredentials } from "@/lib/actions/user.actions";
import { SignInButton } from "@/components/auth/sign-in/sign-in-button";
import { SignInPrompt } from "@/components/auth/sign-in/sign-in-prompt";
import { DisplayErrorMessage } from "@/components/common/display-error-message";
import { EmailField } from "@/components/auth/email-field";
import { PasswordField } from "@/components/auth/password-field";
import { signInDefaultValues } from "@/lib/constants/auth";
import { initialActionState } from "@/lib/actions/utils.actions";

export const CredentialsSignInForm = () => {
  const [data, action] = useActionState(
    signInWithCredentials,
    initialActionState
  );

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <EmailField defaultValue={signInDefaultValues.email} />
        <PasswordField defaultValue={signInDefaultValues.password} />
        <SignInButton />
        <DisplayErrorMessage error={!data.success} message={data.message} />
        <SignInPrompt />
      </div>
    </form>
  );
};
