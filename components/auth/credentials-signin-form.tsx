"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants/auth";

export type CredentialsSignInFormProps = {};

export const CredentialsSignInForm = ({}: CredentialsSignInFormProps) => {
  return (
    <form>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
            required
          />
        </div>
        <div>
          <Button className="w-full">Entrar</Button>
        </div>
        <div className="text-sm text-center text-muted-foreground">
          Não tem uma conta?{" "}
          <Link className="link" href="/acesso/cadastrar" target="_self">
            Cadastre-se
          </Link>
        </div>
      </div>
    </form>
  );
};
