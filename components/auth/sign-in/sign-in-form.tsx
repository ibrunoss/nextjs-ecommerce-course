import { EmailField } from "@/components/auth/email-field";
import { PasswordField } from "@/components/auth/password-field";
import { SignInButton } from "@/components/auth/sign-in/sign-in-button";
import { SignInPrompt } from "@/components/auth/sign-in/sign-in-prompt";
import { DisplayErrorMessage } from "@/components/common/display-error-message";
import { signInDefaultValues } from "@/lib/constants/auth";

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
  <form action={action}>
    <input type="hidden" name="callbackUrl" value={callbackUrl} />
    <div className="space-y-6">
      <EmailField defaultValue={defaultValues.email} />
      <PasswordField defaultValue={defaultValues.password} />
      <SignInButton />
      <DisplayErrorMessage error={showError} message={errorMessage} />
      <SignInPrompt />
    </div>
  </form>
);
