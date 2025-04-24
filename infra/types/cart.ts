import { z } from "zod";
import { Prisma } from "@prisma/client";

import {
  cartDatabaseSchema,
  cartDatabaseInsertSchema,
  cartItemDatabaseSchema,
} from "@/lib/validators/cart";

export type CartDatabase = z.infer<typeof cartDatabaseSchema>;

export type CartDatabaseInsert = z.infer<typeof cartDatabaseInsertSchema>;

export type CartItemDatabase = z.infer<typeof cartItemDatabaseSchema>;

export type CartPrisma = Prisma.CartGetPayload<{
  include: {
    cartItems: {
      include: {
        product: true;
      };
    };
  };
}>;

export type CartItemPrisma = Prisma.CartItemGetPayload<{
  include: {
    product: true;
  };
}>;
