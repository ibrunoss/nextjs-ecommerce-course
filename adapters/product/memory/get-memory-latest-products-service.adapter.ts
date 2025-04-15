import { ProductEntity } from "@/domain/entities/product.entity";
import { productsInMemory } from "@/adapters/product/memory/db";
import { mapMemoryProductToDomainProduct } from "@/adapters/product/memory/map-memory-product-to-domain-product";

export async function getMemoryLatestProductsServiceAdapter(): Promise<
  ProductEntity[]
> {
  const response = productsInMemory.filter((_, idx) => idx < 4);
  const products: ProductEntity[] = response.map(
    mapMemoryProductToDomainProduct
  );

  return products;
}
