import { z } from "zod";

export const currencyDatabaseSchema = z
  .string()
  .min(0)
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(value),
    "O valor deve conter exatamente duas casas decimais"
  );

// Schema para CurrencyValueEntity
export const currencyValueEntitySchema = z.object({
  stringValue: z.string(),
  numericValue: z.number(),
});

// Schema para CurrencyEntity
export const currencyEntitySchema = z.object({
  originalValue: z.string(),
  numericValue: z.number(),
  displayValue: z.string(),
  integerPart: currencyValueEntitySchema,
  fractionalPart: currencyValueEntitySchema,
  currencySymbol: z.string(),
  fractionalSymbol: z.string(),
});
