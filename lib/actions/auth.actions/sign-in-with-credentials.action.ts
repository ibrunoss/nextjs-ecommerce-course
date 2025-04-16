"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn } from "@/auth";
import { signInFormSchema } from "@/lib/validators/user";
import { ActionState } from "@/lib/actions/utils.actions";

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
      message: { description: "Login realizado com sucesso", type: "success" },
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      errors: [],
      success: false,
      message: { description: "E-mail ou senha inválido", type: "error" },
    };
  }
}
