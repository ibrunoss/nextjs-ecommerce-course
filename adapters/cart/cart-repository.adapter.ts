import { CartRepository } from "@/domain/repositories/cart.repository";

import { prismaCartRepositoryAdapter } from "@/adapters/cart/prisma/prisma-cart-repository.adapter";

export const cartRepositoryAdapter: CartRepository =
  prismaCartRepositoryAdapter;
