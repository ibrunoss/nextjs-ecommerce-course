"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { signUpWithCredentials } from "@/lib/actions/user.actions";
import { signUpDefaultValues } from "@/lib/constants/auth";
import { initialActionState } from "@/lib/actions/utils.actions";
import { SignUpForm } from "@/components/auth/sign-up/sign-up-form";

export const CredentialsSignUpForm = () => {
  const [data, action] = useActionState(
    signUpWithCredentials,
    initialActionState
  );

  const errorMessage = !data.success
    ? data.errors.map((e) => e.message.description).join(". ")
    : "";

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <SignUpForm
      action={action}
      defaultValues={signUpDefaultValues}
      callbackUrl={callbackUrl}
      errorMessage={errorMessage}
      showError={!data.success}
    />
  );
};
