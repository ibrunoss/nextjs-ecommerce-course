import { z } from "zod";

export const dateEntitySchema = z.object({
  formatted: z.string({ required_error: "Data formatada é obrigatória." }),
  day: z.string({ required_error: "Dia é obrigatório." }),
  month: z.string({ required_error: "Mês é obrigatório." }),
  year: z.string({ required_error: "Ano é obrigatório." }),
  date: z.coerce.date({ invalid_type_error: "Data inválida." }),
});
