"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";

import { signIn, signOut } from "@/auth";
import { signInFormSchema, signUpFormSchema } from "@/lib/validators/user";
import { PASSWORD_SALT } from "@/lib/constants/auth";
import { prisma } from "@/infra/db/prisma";
import {
  ActionState,
  CathActionError,
  getActionErrors,
  ReplaceMessageByCodeAndName,
} from "@/lib/actions/utils.actions";

export async function signInWithCredentials(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return {
      success: true,
      message: "Login realizado com sucesso",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      errors: [],
      success: false,
      message: "E-mail ou senha inválido",
    };
  }
}

export async function signOutUser() {
  await signOut();
}

export async function signUpWithCredentials(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const user = signUpFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      name: formData.get("name"),
    });

    await prisma.user.create({
      data: {
        email: user.email,
        password: hashSync(user.password, PASSWORD_SALT),
        name: user.name,
      },
    });

    await signIn("credentials", { email: user.email, password: user.password });

    return {
      success: true,
      message: "Usuário cadastrado com sucesso",
    };
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }

    const error = e as CathActionError;
    const replacementMessageByCodeAndName: ReplaceMessageByCodeAndName[] = [
      {
        code: "P2002",
        message: "Usuário ja cadastrado!",
        name: "PrismaClientKnownRequestError",
      },
    ];

    return getActionErrors({ error, replacementMessageByCodeAndName });
  }
}
