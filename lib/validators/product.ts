import { z } from "zod";

import {
  currencyDatabaseSchema,
  currencyEntitySchema,
} from "@/lib/validators/currency";
import { dateEntitySchema } from "@/lib/validators/date";

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
  price: currencyDatabaseSchema,
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

export const productEntitySchema = z.object({
  id: z.string({ required_error: "ID do produto é obrigatório." }),
  name: z.string({ required_error: "Nome do produto é obrigatório." }),
  price: currencyEntitySchema,
  description: z.string({ required_error: "Descrição é obrigatória." }),
  banner: z.string({ required_error: "Imagem de banner é obrigatória." }),
  images: z.array(z.string(), { required_error: "Imagens são obrigatórias." }),
  stock: z.number({ required_error: "Estoque é obrigatório." }),
  discount: z.number(),
  category: z.string({ required_error: "Categoria é obrigatória." }),
  rating: z.number(),
  reviews: z.number(),
  brand: z.string({ required_error: "Marca é obrigatória." }),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
  tags: z.array(z.string()),
  features: z.array(z.string()),
  bestSelling: z.boolean(),
  newArrival: z.boolean(),
  topRated: z.boolean(),
  isFeatured: z.boolean(),
  isAvailable: z.boolean(),
  trending: z.boolean(),
  createdAt: dateEntitySchema,
  updatedAt: dateEntitySchema,
  slug: z.string({ required_error: "Slug é obrigatório." }),
});
