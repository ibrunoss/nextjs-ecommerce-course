import Link from "next/link";

import { SIGN_UP_PATH } from "@/lib/constants/routes";

export const SignInPrompt = () => {
  return (
    <div className="text-sm text-center text-muted-foreground">
      Não tem uma conta?{" "}
      <Link className="link" href={SIGN_UP_PATH} target="_self">
        Cadastre-se
      </Link>
    </div>
  );
};
