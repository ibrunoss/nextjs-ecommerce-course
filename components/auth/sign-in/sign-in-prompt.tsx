import Link from "next/link";

export const SignInPrompt = () => {
  return (
    <div className="text-sm text-center text-muted-foreground">
      Não tem uma conta?{" "}
      <Link className="link" href="/acesso/cadastrar" target="_self">
        Cadastre-se
      </Link>
    </div>
  );
};
