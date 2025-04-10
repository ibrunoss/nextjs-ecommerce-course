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

export function createCurrencyEntity(
  value: string | number,
  currencySymbol: string = "R$",
  fractionalSymbol: string = ","
): CurrencyEntity {
  try {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      throw new Error("Invalid input: cannot convert to a number.");
    }

    const formattedValue = numericValue.toFixed(2);

    const [integerString, fractionalString] = formattedValue.split(".");
    const integerNumeric = parseInt(integerString, 10);
    const fractionalNumeric = parseInt(fractionalString, 10);

    return {
      originalValue: value.toString(),
      numericValue,
      displayValue: `${currencySymbol} ${integerString}${fractionalSymbol}${fractionalString}`,
      integerPart: {
        stringValue: integerString,
        numericValue: integerNumeric,
      },
      fractionalPart: {
        stringValue: fractionalString,
        numericValue: fractionalNumeric,
      },

      currencySymbol,
      fractionalSymbol,
    };
  } catch (error) {
    console.error("Error creating CurrencyEntity:", error);
    throw new Error(
      "Failed to create CurrencyEntity. Please verify the input."
    );
  }
}
