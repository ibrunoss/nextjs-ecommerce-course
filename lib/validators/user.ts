import { z } from "zod";

// Esquema para login de usuário
export const signInFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(6, "A senha deve conter ao menos seis (6) caracteres"),
});

// Esquema para cadastro de usuário
export const signUpFormSchema = signInFormSchema
  .extend({
    name: z.string().min(3, "O nome deve conter ao menos três (3) caracteres"),
    confirmPassword: z
      .string()
      .min(
        6,
        "A senha de confirmação deve conter ao menos seis (6) caracteres"
      ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "As senhas devem ser iguais",
        code: z.ZodIssueCode.custom,
      });
    }
  });
