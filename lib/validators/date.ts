import { z } from "zod";

export const dateEntitySchema = z.object({
  formatted: z.string(),
  day: z.string(),
  month: z.string(),
  year: z.string(),
  date: z.coerce.date(), // converte string ou number para Date
});
