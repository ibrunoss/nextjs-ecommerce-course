import { getMemoryLatestProductsServiceAdapter } from "@/infra/adapters/product/memory/get-memory-latest-products-service.adapter";
import { getMemoryProductBySlugServiceAdapter } from "@/infra/adapters/product/memory/get-memory-product-by-slug-service.adapter";
import { getMemoryProductByIdServiceAdapter } from "@/infra/adapters/product/memory/get-memory-product-by-id-service.adapter";
import { ProductRepository } from "@/domain/repositories/product.repository";

export const memoryProductRepositoryAdapter: ProductRepository = {
  create: async () => {},
  delete: async () => {},
  findBySlug: getMemoryProductBySlugServiceAdapter,
  findById: getMemoryProductByIdServiceAdapter,
  getLatest: getMemoryLatestProductsServiceAdapter,
  save: async () => {},
};
