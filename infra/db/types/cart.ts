import { z } from "zod";

import {
  cartDatabaseSchema,
  cartDatabaseInsertSchema,
  cartItemDatabaseSchema,
} from "@/lib/validators/cart";

export type CartDatabase = z.infer<typeof cartDatabaseSchema>;

export type CartItemDatabaseInsert = z.infer<typeof cartDatabaseInsertSchema>;

export type CartItemDatabase = z.infer<typeof cartItemDatabaseSchema>;
