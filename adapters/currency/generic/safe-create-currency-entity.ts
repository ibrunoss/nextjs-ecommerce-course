import { CurrencyEntity } from "@/domain/currency.entities";
import { createCurrencyEntity } from "@/adapters/currency/generic/create-currency-entity";

export function safeCreateCurrencyEntity(
  input: string | number
): CurrencyEntity {
  const fallbackResponse = {
    originalValue: "0.0",
    numericValue: 0,
    displayValue: "0,00",
    integerPart: { stringValue: "0", numericValue: 0 },
    fractionalPart: { stringValue: "0", numericValue: 0 },
    currencySymbol: "R$",
    fractionalSymbol: ",",
  };

  try {
    // Reusing `createDateEntity` to ensure consistency
    const currency = createCurrencyEntity(input);

    // Checking if the function returned an error (unexpected, but extra safety)
    if (!currency || currency instanceof Error) {
      return fallbackResponse;
    }

    return currency;
  } catch {
    return fallbackResponse;
  }
}
