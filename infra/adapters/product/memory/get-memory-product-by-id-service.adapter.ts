import { ProductEntity } from "@/domain/entities/product.entity";
import { memorySampleData } from "@/infra/db/memory-sample-data";
import { memoryProductToProductEntityMapper } from "@/infra/mappers/product/memory-product-to-product-entity.mapper";

export async function getMemoryProductByIdServiceAdapter(
  id: string
): Promise<ProductEntity | null> {
  const response = memorySampleData.products.find(
    (product) => product.id === id
  );

  if (!response) {
    return null;
  }

  const product: ProductEntity | null =
    memoryProductToProductEntityMapper(response);

  return product;
}
