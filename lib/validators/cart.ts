import { z } from "zod";

import { currencySchema } from "@/lib/validators/shared";

export const cartItemDatabaseSchema = z.object({
  productId: z.string().min(1, "Produto é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  quantity: z.number().int().positive("Obrigatório ao menos um produto"),
  image: z.string().min(1, "Imagem é obrigatória"),
  price: currencySchema,
});

export const cartDatabaseInsertSchema = z.object({
  sessionCartId: z
    .string()
    .min(1, "Identificador do carrinho da sessão é obrigatório"),
  items: z.array(cartItemDatabaseSchema),
  itemsPrice: currencySchema,
  shippingPrice: currencySchema,
  taxPrice: currencySchema,
  totalPrice: currencySchema,
  userId: z.string().optional().nullable(),
});

export const cartDatabaseSchema = cartDatabaseInsertSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
