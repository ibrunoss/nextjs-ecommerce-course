import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/acesso/entrar",
    signOut: "/acesso/sair",
    error: "/acesso/erro",
    verifyRequest: "/acesso/verificacao",
    newUser: "/acesso/cadastrar",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  providers: [],
  callbacks: {
    async session({ session, token }) {
      session.user.id = String(token.sub);
      session.user.role = String(token.role);
      session.user.name = String(token.name);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};
