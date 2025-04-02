import { DateEntity } from "@/domain/date.entities";
import { createDateEntity } from "@/adapters/date/generic/create-date-entity";

export function safeCreateDateEntity(date: string | Date): DateEntity {
  const fallbackDate = new Date("1900-01-01");
  const fallbackDay = String(fallbackDate.getDate()).padStart(2, "0");
  const fallbackMonth = String(fallbackDate.getMonth() + 1).padStart(2, "0");
  const fallbackYear = fallbackDate.getFullYear().toString();

  const fallbackResponse = {
    date: fallbackDate,
    formatted: `${fallbackDay}/${fallbackMonth}/${fallbackYear}`,
    day: fallbackDay,
    month: fallbackMonth,
    year: fallbackYear,
  };

  try {
    // Reusing `createDateEntity` to ensure consistency
    const $date = createDateEntity(date);

    // Checking if the function returned an error (unexpected, but extra safety)
    if (!$date || $date instanceof Error) {
      return fallbackResponse;
    }

    return $date;
  } catch {
    return fallbackResponse;
  }
}
