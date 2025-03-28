"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { signInWithCredentials } from "@/lib/actions/user.actions";
import { SignInButton } from "@/components/auth/sign-in/sign-in-button";
import { SignInPrompt } from "@/components/auth/sign-in/sign-in-prompt";
import { SubmitFeedback } from "@/components/auth/submit-feedback";
import { EmailField } from "@/components/auth/email-field";
import { PasswordField } from "@/components/auth/password-field";
import { signInDefaultValues } from "@/lib/constants/auth";

export const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <EmailField defaultValue={signInDefaultValues.email} />
        <PasswordField defaultValue={signInDefaultValues.password} />
        <SignInButton />
        <SubmitFeedback error={!data.success} message={data.message} />
        <SignInPrompt />
      </div>
    </form>
  );
};
