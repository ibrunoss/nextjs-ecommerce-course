import { z } from "zod";

import {
  currencyDatabaseSchema,
  currencyEntitySchema,
} from "@/lib/validators/currency";
import { dateEntitySchema } from "@/lib/validators/date";
import {
  productDatabaseSchema,
  productEntitySchema,
} from "@/lib/validators/product";

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
  id: z.string({ required_error: "ID do item do carrinho é obrigatório." }),
  cartId: z.string({ required_error: "ID do carrinho é obrigatório." }),
  productId: z.string({ required_error: "ID do produto é obrigatório." }),
  product: productEntitySchema,
  quantity: z.number({ required_error: "Quantidade é obrigatória." }),
  price: currencyEntitySchema,
});

// Schema para CartEntity
export const cartEntitySchema = z.object({
  id: z.string({ required_error: "ID do carrinho é obrigatório." }),
  sessionCartId: z.string({
    required_error: "ID da sessão do carrinho é obrigatório.",
  }),
  items: z.array(cartItemEntitySchema, {
    required_error: "Itens do carrinho são obrigatórios.",
  }),
  itemsPrice: currencyEntitySchema,
  shippingPrice: currencyEntitySchema,
  taxPrice: currencyEntitySchema,
  totalPrice: currencyEntitySchema,
  userId: z.string({ required_error: "ID do usuário é obrigatório." }),
  createdAt: dateEntitySchema,
  updatedAt: dateEntitySchema,
});
