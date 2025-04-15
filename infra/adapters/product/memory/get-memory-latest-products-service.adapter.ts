import { ProductEntity } from "@/domain/entities/product.entity";
import { productsInMemory } from "@/infra/adapters/product/memory/db";
import { mapMemoryProductToDomainProduct } from "@/infra/adapters/product/memory/map-memory-product-to-domain-product";

export async function getMemoryLatestProductsServiceAdapter(): Promise<
  ProductEntity[]
> {
  const response = productsInMemory.filter((_, idx) => idx < 4);
  const products: ProductEntity[] = response.map(
    mapMemoryProductToDomainProduct
  );

  return products;
}
