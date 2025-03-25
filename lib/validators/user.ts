import { z } from "zod";

// Scheme for user login
export const signInFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(6, "A senha deve conter ao menos seis (6) caracteres"),
});
