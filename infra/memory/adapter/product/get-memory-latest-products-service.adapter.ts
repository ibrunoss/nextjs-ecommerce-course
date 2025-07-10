import { ProductEntity } from "@/domain/entities/product.entity";
import { memorySampleData } from "@/infra/memory/db/memory-sample-data";
import { memoryProductToProductEntityMapper } from "@/infra/memory/mappers/product/memory-product-to-product-entity.mapper";

export async function getMemoryLatestProductsServiceAdapter(): Promise<
  ProductEntity[]
> {
  const response = memorySampleData.products.filter((_, idx) => idx < 4);
  const products: ProductEntity[] = response.map(
    memoryProductToProductEntityMapper
  );

  return products;
}
