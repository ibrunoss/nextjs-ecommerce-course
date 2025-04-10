import { CurrencyEntity } from "@/domain/entities/currency.entity";

export interface CurrencyAdapter {
  createEntity(input: string | number): CurrencyEntity | Error;
  safeCreateEntity(input: string | number): CurrencyEntity;
  createEntityOrFallback<F>(
    date: string | number,
    fallback: F
  ): CurrencyEntity | F;
}
