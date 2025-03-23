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
