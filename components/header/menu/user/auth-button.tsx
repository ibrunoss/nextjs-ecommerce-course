import Link from "next/link";
import { UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SIGN_IN_PATH } from "@/lib/constants/routes";

export const AuthButton = () => {
  return (
    <Button asChild>
      <Link href={SIGN_IN_PATH}>
        <UserIcon /> Entrar
      </Link>
    </Button>
  );
};
