import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "./infra/db/prisma";
import { compareSync } from "bcrypt-ts-edge";

export const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/acesso/entrar",
    signOut: "/acesso/sair",
    error: "/acesso/erro", // Error code passed in query string as ?error=
    verifyRequest: "/acesso/verificacao", // (used for check email message)
    newUser: "/acesso/novo-usuario", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "eVoluir",
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "dominio@email.com",
        },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        let isMatch = false;

        const user = await prisma.user.findFirst({
          where: {
            email: String(credentials.email),
          },
        });

        if (user?.password) {
          isMatch = compareSync(String(credentials.password), user.email);
        }

        if (user && isMatch) {
          const {
            address,
            email,
            emailVerified,
            id,
            image,
            name,
            paymentMethod,
            role,
          } = user;

          return {
            address,
            email,
            emailVerified,
            id,
            image,
            name,
            paymentMethod,
            role,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, user, trigger, token }) {
      session.user.id = String(token.sub);

      // If there is an update, set the user name;
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
