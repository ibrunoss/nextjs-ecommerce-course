import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JS object
export function prismaToJS<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Format currency value
export function formatCurrency(value: number) {
  const [int, decimal] = value.toString().split(".");
  return decimal ? `${int},${decimal.padEnd(2, "0")}` : `${int},00`;
}

// Round number to 2 decimal places
export function round2(value: string | number) {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    throw new Error(
      `Invalid input: Expected a numeric value, but received "${typeof value}" with value "${value}".`
    );
  }

  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}
