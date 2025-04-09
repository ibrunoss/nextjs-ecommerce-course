import { CurrencyEntity } from "@/domain/entities/currency.entities";

export function createCurrencyEntity(
  input: string | number
): CurrencyEntity | Error {
  try {
    const numericValue = typeof input === "string" ? parseFloat(input) : input;

    if (isNaN(numericValue)) {
      throw new Error("Invalid input: cannot convert to a number.");
    }

    const formattedValue = numericValue.toFixed(2);

    const [integerString, fractionalString] = formattedValue.split(".");
    const integerNumeric = parseInt(integerString, 10);
    const fractionalNumeric = parseInt(fractionalString, 10);
    const currencySymbol = "R$";
    const fractionalSymbol = ",";

    return {
      originalValue: input.toString(),
      numericValue: numericValue,
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
