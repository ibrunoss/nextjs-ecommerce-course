import { SignUpButton } from "@/components/auth/sign-up/sign-up-button";
import { SignUpPrompt } from "@/components/auth/sign-up/sign-up-prompt";
import { DisplayErrorMessage } from "@/components/common/display-error-message";
import { EmailField } from "@/components/auth/email-field";
import { PasswordField } from "@/components/auth/password-field";
import { NameField } from "@/components/auth/name-field";
import { ConfirmPasswordField } from "@/components/auth/confirm-password-field";
import { signUpDefaultValues } from "@/lib/constants/auth";

type FormAction = (formData: FormData) => void | Promise<void>;

type Props = {
  action: FormAction;
  defaultValues: typeof signUpDefaultValues;
  callbackUrl: string;
  errorMessage: string;
  showError: boolean;
};

export const SignUpForm = ({
  action,
  defaultValues,
  callbackUrl,
  errorMessage,
  showError,
}: Props) => (
  <form action={action}>
    <input type="hidden" name="callbackUrl" value={callbackUrl} />
    <div className="space-y-6">
      <NameField defaultValue={defaultValues.name} />
      <EmailField defaultValue={defaultValues.email} />
      <PasswordField defaultValue={defaultValues.password} />
      <ConfirmPasswordField defaultValue={defaultValues.confirmPassword} />
      <SignUpButton />
      <DisplayErrorMessage error={showError} message={errorMessage} />
      <SignUpPrompt />
    </div>
  </form>
);
