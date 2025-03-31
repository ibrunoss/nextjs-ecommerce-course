import { z } from "zod";

import {
  cartDatabaseSchema,
  cartItemDatabaseInsertSchema,
  cartItemSchema,
} from "@/lib/validators/cart";

export type CartDatabase = z.infer<typeof cartDatabaseSchema>;

export type CartItemDatabaseInsert = z.infer<
  typeof cartItemDatabaseInsertSchema
>;

export type CartItem = z.infer<typeof cartItemSchema>;
