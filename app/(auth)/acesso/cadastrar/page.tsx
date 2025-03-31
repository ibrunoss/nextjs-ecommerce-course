import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CredentialsSignUpForm } from "@/components/auth/sign-up/credentials-sign-up-form";

export const metadata: Metadata = {
  title: "Cadastrar",
};

export type SignUpPageProps = Readonly<{
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}>;

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { callbackUrl } = await searchParams;
  const session = await auth();

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4 text-center">
          <CardTitle>Cadastrar Conta</CardTitle>
          <CardDescription>
            Preencha suas informações para se cadastrar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
