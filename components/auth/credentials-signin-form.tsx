"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { signInWithCredentials } from "@/lib/actions/user.actions";
import { SignInButton } from "@/components/auth/sign-in-button";
import { SignUpPrompt } from "@/components/auth/sign-up-prompt";
import { SubmitFeedback } from "./submit-feedback";
import { InputEmail } from "@/components/auth/input-email";
import { InputPassword } from "@/components/auth/input-password";

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
        <InputEmail />
        <InputPassword />
        <SignInButton />
        <SubmitFeedback error={!data.success} message={data.message} />
        <SignUpPrompt />
      </div>
    </form>
  );
};
