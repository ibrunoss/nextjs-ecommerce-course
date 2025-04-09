import { CartRepository } from "@/domain/repositories/cart.repository";
import { getPrismaCartBySessionCartIdServiceAdapter } from "@/adapters/cart/prisma/get-prisma-cart-by-session-cart-id-service.adapter";
import { getPrismaCartByUserIdServiceAdapter } from "@/adapters/cart/prisma/get-prisma-cart-by-user-id-service.adapter";
import { createPrismaCartServiceAdapter } from "@/adapters/cart/prisma/create-prisma-cart-service.adapter";

export const prismaCartRepositoryAdapter: CartRepository = {
  create: createPrismaCartServiceAdapter,
  delete: async () => {},
  findBySessionCartId: getPrismaCartBySessionCartIdServiceAdapter,
  findByUserId: getPrismaCartByUserIdServiceAdapter,
  save: createPrismaCartServiceAdapter,
};
