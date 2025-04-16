import { DisplayErrorMessage } from "@/components/common/display-error-message";

type Props = {
  action: (formData: FormData) => void;
  callbackUrl: string;
  errorMessage: string;
  showError: boolean;
  children: React.ReactNode;
  footer: React.ReactNode; // botão + prompt, por exemplo
};

export const BaseAuthForm = ({
  action,
  callbackUrl,
  errorMessage,
  showError,
  children,
  footer,
}: Props) => (
  <form action={action}>
    <input type="hidden" name="callbackUrl" value={callbackUrl} />
    <div className="space-y-6">
      {children}
      <DisplayErrorMessage error={showError} message={errorMessage} />
      {footer}
    </div>
  </form>
);
