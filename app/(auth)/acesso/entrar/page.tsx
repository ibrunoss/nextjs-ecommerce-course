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
import { CredentialsSignInForm } from "@/components/auth/sign-in/credentials-sign-in-form";

export const metadata: Metadata = {
  title: "Entrar",
};

export type SignInPageProps = Readonly<{
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}>;

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;
  const session = await auth();

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4 text-center">
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Entre na sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
