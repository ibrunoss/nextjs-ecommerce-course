import { z } from "zod";

import { formatCurrency } from "@/lib/utils";

export const currencySchema = z
  .string()
  .min(0)
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatCurrency(Number(value))),
    "O valor deve conter exatamente duas casas decimais"
  );
