import { DateEntity } from "@/domain/entities/date.entity";

export interface DateAdapter {
  createEntity(date: string | Date | number): DateEntity | Error;
  safeCreateEntity(date: string | Date | number): DateEntity;
  createEntityOrFallback<F>(
    date: string | Date | number,
    fallback: F
  ): DateEntity | F;
}
