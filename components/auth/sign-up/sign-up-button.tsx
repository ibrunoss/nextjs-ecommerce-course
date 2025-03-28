import { ButtonFormStatus } from "@/components/common/button-form-status";

export const SignUpButton = () => {
  return (
    <ButtonFormStatus className="w-full" pendingMessage="Cadastrando...">
      Cadastrar
    </ButtonFormStatus>
  );
};
