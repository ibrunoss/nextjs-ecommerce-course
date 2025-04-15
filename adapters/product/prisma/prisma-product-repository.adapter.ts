import { getPrismaLatestProductsServiceAdapter } from "@/adapters/product/prisma/get-prisma-latest-products-service.adapter";
import { getPrismaProductBySlugServiceAdapter } from "@/adapters/product/prisma/get-prisma-product-by-slug-service.adapter";
import { getPrismaProductByIdServiceAdapter } from "@/adapters/product/prisma/get-prisma-product-by-id-service.adapter";
import { ProductRepository } from "@/domain/repositories/product.repository";

export const prismaProductRepositoryAdapter: ProductRepository = {
  create: async () => {},
  delete: async () => {},
  findBySlug: getPrismaProductBySlugServiceAdapter,
  findById: getPrismaProductByIdServiceAdapter,
  getLatest: getPrismaLatestProductsServiceAdapter,
  save: async () => {},
};
