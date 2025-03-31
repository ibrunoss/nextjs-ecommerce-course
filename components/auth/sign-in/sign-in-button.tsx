import { ButtonFormStatus } from "@/components/common/button-form-status";

export const SignInButton = () => {
  return (
    <ButtonFormStatus className="w-full" pendingMessage="Entrando...">
      Entrar
    </ButtonFormStatus>
  );
};
