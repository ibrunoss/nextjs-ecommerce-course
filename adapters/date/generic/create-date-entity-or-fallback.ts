import { DateEntity } from "@/domain/entities/date.entities";
import { createDateEntity } from "@/adapters/date/generic/create-date-entity";

export function createDateEntityOrFallback<F>(
  date: string | Date,
  fallback: F
): DateEntity | F {
  try {
    const $date = createDateEntity(date);

    if (!$date || $date instanceof Error) {
      return fallback;
    }

    return $date;
  } catch {
    return fallback;
  }
}
