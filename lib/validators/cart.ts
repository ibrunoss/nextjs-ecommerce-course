import { z } from "zod";

import {
  currencyDatabaseSchema,
  currencyEntitySchema,
} from "@/lib/validators/currency";
import { dateEntitySchema } from "@/lib/validators/date";

export const cartItemDatabaseSchema = z.object({
  productId: z.string().min(1, "Produto é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  quantity: z.number().int().positive("Obrigatório ao menos um produto"),
  image: z.string().min(1, "Imagem é obrigatória"),
  price: currencyDatabaseSchema,
});

export const cartDatabaseInsertSchema = z.object({
  sessionCartId: z
    .string()
    .min(1, "Identificador do carrinho da sessão é obrigatório"),
  items: z.array(cartItemDatabaseSchema),
  itemsPrice: currencyDatabaseSchema,
  shippingPrice: currencyDatabaseSchema,
  taxPrice: currencyDatabaseSchema,
  totalPrice: currencyDatabaseSchema,
  userId: z.string().optional().nullable(),
});

export const cartDatabaseSchema = cartDatabaseInsertSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema para CartItemEntity
export const cartItemEntitySchema = z.object({
  productId: z.string(),
  name: z.string(),
  slug: z.string(),
  quantity: z.number().int().nonnegative(),
  image: z.string(),
  price: currencyEntitySchema,
});

// Schema para CartEntity
export const cartEntitySchema = z.object({
  id: z.string(),
  sessionCartId: z.string(),
  items: z.array(cartItemEntitySchema),
  itemsPrice: currencyEntitySchema,
  shippingPrice: currencyEntitySchema,
  taxPrice: currencyEntitySchema,
  totalPrice: currencyEntitySchema,
  userId: z.string(),
  createdAt: dateEntitySchema,
  updatedAt: dateEntitySchema,
});
