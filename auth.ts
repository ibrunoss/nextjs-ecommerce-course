import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/infra/db/prisma";
import { authConfig } from "@/auth.config";

export const config: NextAuthConfig = {
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
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
          isMatch = compareSync(String(credentials.password), user.password);
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
      session.user.role = String(token.role);
      session.user.name = String(token.name);
      // If there is an update, set the user name;
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    async jwt({ token, user }) {
      // Assign user fields to token
      if (user) {
        token.role = user.role;

        if (user.name === "NO_NAME" && user.email) {
          token.name = user.email.split("@")[0];

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }

      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
