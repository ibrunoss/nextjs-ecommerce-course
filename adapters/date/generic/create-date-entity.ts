export function createDateEntity(date: string | Date) {
  try {
    // Ensuring the `date` is a valid Date object
    const $date = new Date(date);
    if (isNaN($date.getTime())) {
      throw new Error("Invalid date.");
    }

    // Formatting date components
    const day = String($date.getDate()).padStart(2, "0");
    const month = String($date.getMonth() + 1).padStart(2, "0");
    const year = $date.getFullYear().toString();

    return {
      date: $date, // Original Date object
      formatted: `${day}/${month}/${year}`, // Formatted date
      day,
      month,
      year,
    };
  } catch (error) {
    console.error("Error creating date entity:", error);
    throw new Error("Failed to create date entity.");
  }
}
