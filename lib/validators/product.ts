import { z } from "zod";

import { currencySchema } from "@/lib/validators/shared";

// Schema for inserting a new product
export const productDatabaseInsertSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve conter no mínimo (3) caracteres")
    .max(255, "O nome deve conter no máximo (255) caracteres"),
  slug: z
    .string()
    .min(3, "O slug deve conter no mínimo (3) caracteres")
    .max(255, "O slug deve conter no máximo (255) caracteres"),
  description: z
    .string()
    .min(3, "A descrição deve conter no mínimo (3) caracteres")
    .max(255, "A descrição deve conter no máximo (255) caracteres"),
  category: z
    .string()
    .min(3, "A categoria deve conter no mínimo (3) caracteres")
    .max(255, "A categoria deve conter no máximo (255) caracteres"),
  price: currencySchema,
  stock: z.coerce.number().min(0),
  brand: z.string().min(3).max(255),
  images: z
    .array(z.string())
    .min(1, "O produto deve conter ao menos uma imagem"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});

export const productDatabaseSchema = productDatabaseInsertSchema.extend({
  id: z.string(),
  numReviews: z.number(),
  rating: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
