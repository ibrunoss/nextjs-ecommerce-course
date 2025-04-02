import { CurrencyAdapter } from "@/adapters/currency/currency.adapter";
import { createCurrencyEntity } from "@/adapters/currency/generic/create-currency-entity";
import { safeCreateCurrencyEntity } from "@/adapters/currency/generic/safe-create-currency-entity";
import { createCurrencyEntityOrFallback } from "@/adapters/currency/generic/create-currency-entity-or-fallback";

export const currencyGenericAdapter: CurrencyAdapter = {
  createEntity: createCurrencyEntity,
  createEntityOrFallback: createCurrencyEntityOrFallback,
  safeCreateEntity: safeCreateCurrencyEntity,
};
