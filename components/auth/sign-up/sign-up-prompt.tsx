import Link from "next/link";

export const SignUpPrompt = () => {
  return (
    <div className="text-sm text-center text-muted-foreground">
      Já tem uma conta?{" "}
      <Link className="link" href="/acesso/entrar" target="_self">
        Entre
      </Link>
    </div>
  );
};
