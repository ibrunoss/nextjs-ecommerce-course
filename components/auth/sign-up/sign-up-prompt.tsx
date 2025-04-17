import Link from "next/link";

import { SIGN_IN_PATH } from "@/lib/constants/routes";

export const SignUpPrompt = () => {
  return (
    <div className="text-sm text-center text-muted-foreground">
      Já tem uma conta?{" "}
      <Link className="link" href={SIGN_IN_PATH} target="_self">
        Entre
      </Link>
    </div>
  );
};
