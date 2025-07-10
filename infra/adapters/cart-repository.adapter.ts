import { CartRepository } from "@/domain/repositories/cart.repository";
import { prismaCartRepositoryAdapter } from "@/infra/prisma/adapter/cart/prisma-cart-repository.adapter";

export const cartRepositoryAdapter: CartRepository =
  prismaCartRepositoryAdapter;
