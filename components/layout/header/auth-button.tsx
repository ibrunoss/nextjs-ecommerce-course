import Link from "next/link";
import { UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AuthButton = () => {
  return (
    <Button asChild>
      <Link href="/acesso/entrar">
        <UserIcon /> Entrar
      </Link>
    </Button>
  );
};
