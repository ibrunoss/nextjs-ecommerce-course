import { z } from "zod";

import { currencySchema } from "@/lib/validators/shared";

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Produto é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  quantity: z.number().int().positive("Obrigatório ao menos um produto"),
  image: z.string().min(1, "Imagem é obrigatória"),
  price: currencySchema,
});

export const cartItemDatabaseInsertSchema = z.object({
  sessionCartId: z
    .string()
    .min(1, "Identificador do carrinho da sessão é obrigatório"),
  items: z.array(cartItemSchema),
  itemsPrice: currencySchema,
  shippingPrice: currencySchema,
  taxPrice: currencySchema,
  totalPrice: currencySchema,
  userId: z.string().optional().nullable(),
});

export const cartDatabaseSchema = cartItemDatabaseInsertSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
