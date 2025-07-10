import { CartRepository } from "@/domain/repositories/cart.repository";
import { createPrismaCartServiceAdapter } from "@/infra/prisma/adapter/cart/create-prisma-cart-service.adapter";
import { getPrismaCartBySessionCartIdServiceAdapter } from "@/infra/prisma/adapter/cart/get-prisma-cart-by-session-cart-id-service.adapter";
import { getPrismaCartByUserIdServiceAdapter } from "@/infra/prisma/adapter/cart/get-prisma-cart-by-user-id-service.adapter";
import { updatePrismaCartServiceAdapter } from "@/infra/prisma/adapter/cart/update-prisma-cart-service.adapter";

export const prismaCartRepositoryAdapter: CartRepository = {
  create: createPrismaCartServiceAdapter,
  delete: async () => {},
  findBySessionCartId: getPrismaCartBySessionCartIdServiceAdapter,
  findByUserId: getPrismaCartByUserIdServiceAdapter,
  save: updatePrismaCartServiceAdapter,
};
