import { ProductEntity } from "@/domain/entities/product.entity";
import { memorySampleData } from "@/infra/db/memory-sample-data";
import { memoryProductToProductEntityMapper } from "@/infra/mappers/product/memory-product-to-product-entity.mapper";

export async function getMemoryProductBySlugServiceAdapter(
  slug: string
): Promise<ProductEntity | null> {
  const response = memorySampleData.products.find(
    (product) => product.id === slug
  );
  let product: ProductEntity | null;

  if (!response) {
    return null;
  }

  try {
    product = memoryProductToProductEntityMapper(response);
  } catch (error) {
    console.error("Error while mapping API product to domain product: ", error);
    product = null;
  }

  return product;
}
