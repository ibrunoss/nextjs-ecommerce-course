"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { signInWithCredentials } from "@/lib/actions/user.actions";
import { initialActionState } from "@/lib/actions/utils.actions";
import { signInDefaultValues } from "@/lib/constants/auth";

import { SignInForm } from "@/components/auth/sign-in/sign-in-form";

export const CredentialsSignInForm = () => {
  const [data, action] = useActionState(
    signInWithCredentials,
    initialActionState
  );

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <SignInForm
      action={action}
      defaultValues={signInDefaultValues}
      callbackUrl={callbackUrl}
      showError={!data.success}
      errorMessage={data.message.description}
    />
  );
};
