import { z } from "zod";

import {
  currencyDatabaseSchema,
  currencyEntitySchema,
} from "@/lib/validators/currency";
import { dateEntitySchema } from "@/lib/validators/date";
import { productDatabaseSchema } from "./product";

export const cartItemDatabaseInsertSchema = z.object({
  cartId: z.string().min(1, "Necessário um carrinho"),
  product: productDatabaseSchema,
  productId: z.string().min(1, "Produto é obrigatório"),
  quantity: z.number().int().positive("Obrigatório ao menos um produto"),
  price: currencyDatabaseSchema,
});
export const cartItemDatabaseSchema = cartItemDatabaseInsertSchema.extend({
  id: z.string(),
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
