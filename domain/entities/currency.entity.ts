import { CurrencyValueEntity } from "@/domain/entities/currency-value.entity";

export interface CurrencyEntity {
  originalValue: string;
  numericValue: number;
  displayValue: string;
  integerPart: CurrencyValueEntity;
  fractionalPart: CurrencyValueEntity;
  currencySymbol: string;
  fractionalSymbol: string;
}
