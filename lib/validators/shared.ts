import { z } from "zod";

export const currencySchema = z
  .string()
  .min(0)
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(value),
    "O valor deve conter exatamente duas casas decimais"
  );
