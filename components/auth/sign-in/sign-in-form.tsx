import { EmailField } from "@/components/auth/email-field";
import { PasswordField } from "@/components/auth/password-field";
import { SignInButton } from "@/components/auth/sign-in/sign-in-button";
import { SignInPrompt } from "@/components/auth/sign-in/sign-in-prompt";
import { signInDefaultValues } from "@/lib/constants/auth";
import { BaseAuthForm } from "@/components/auth/base-auth-form";

type Props = {
  action: (formData: FormData) => void;
  defaultValues: typeof signInDefaultValues;
  callbackUrl: string;
  showError: boolean;
  errorMessage: string;
};

export const SignInForm = ({
  action,
  defaultValues,
  callbackUrl,
  showError,
  errorMessage,
}: Props) => (
  <BaseAuthForm
    action={action}
    callbackUrl={callbackUrl}
    showError={showError}
    errorMessage={errorMessage}
    footer={
      <>
        <SignInButton />
        <SignInPrompt />
      </>
    }
  >
    <EmailField defaultValue={defaultValues.email} />
    <PasswordField defaultValue={defaultValues.password} />
  </BaseAuthForm>
);
