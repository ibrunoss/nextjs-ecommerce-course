export interface CurrencyValueEntity {
  stringValue: string;
  numericValue: number;
}

export interface CurrencyEntity {
  originalValue: string;
  numericValue: number;
  displayValue: string;
  integerPart: CurrencyValueEntity;
  fractionalPart: CurrencyValueEntity;
  currencySymbol: string;
  fractionalSymbol: string;
}
