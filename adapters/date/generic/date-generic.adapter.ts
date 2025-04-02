import { DateAdapter } from "@/adapters/date/date.adapter";
import { createDateEntityOrFallback } from "@/adapters/date/generic/create-date-entity-or-fallback";
import { createDateEntity } from "@/adapters/date/generic/create-date-entity";
import { safeCreateDateEntity } from "@/adapters/date/generic/safe-create-date-entity";

export const dateGenericAdapter: DateAdapter = {
  createEntity: createDateEntity,
  createEntityOrFallback: createDateEntityOrFallback,
  safeCreateEntity: safeCreateDateEntity,
};
