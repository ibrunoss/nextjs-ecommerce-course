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
  stringValue: z.string({ required_error: "Valor em texto é obrigatório." }),
  numericValue: z.number({ required_error: "Valor numérico é obrigatório." }),
});

// Schema para CurrencyEntity
export const currencyEntitySchema = z.object({
  originalValue: z.string({ required_error: "Valor original é obrigatório." }),
  numericValue: z.number({ required_error: "Valor numérico é obrigatório." }),
  displayValue: z.string({
    required_error: "Valor de exibição é obrigatório.",
  }),
  integerPart: currencyValueEntitySchema,
  fractionalPart: currencyValueEntitySchema,
  currencySymbol: z.string({
    required_error: "Símbolo da moeda é obrigatório.",
  }),
  fractionalSymbol: z.string({
    required_error: "Símbolo fracionário é obrigatório.",
  }),
});
