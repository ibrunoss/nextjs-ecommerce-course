import { CurrencyEntity } from "@/domain/entities/currency.entity";
import { createCurrencyEntity } from "@/adapters/currency/generic/create-currency-entity";

export function createCurrencyEntityOrFallback<F>(
  input: string | number,
  fallback: F
): CurrencyEntity | F {
  try {
    const currency = createCurrencyEntity(input);

    if (!currency || currency instanceof Error) {
      return fallback;
    }

    return currency;
  } catch {
    return fallback;
  }
}
