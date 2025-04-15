import { ProductEntity } from "@/domain/entities/product.entity";
import { memorySampleData } from "@/infra/db/memory-sample-data";
import { mapMemoryProductToDomainProduct } from "@/infra/adapters/product/memory/map-memory-product-to-domain-product";

export async function getMemoryLatestProductsServiceAdapter(): Promise<
  ProductEntity[]
> {
  const response = memorySampleData.products.filter((_, idx) => idx < 4);
  const products: ProductEntity[] = response.map(
    mapMemoryProductToDomainProduct
  );

  return products;
}
