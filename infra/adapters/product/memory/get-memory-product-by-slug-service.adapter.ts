import { ProductEntity } from "@/domain/entities/product.entity";
import { memorySampleData } from "@/infra/db/memory-sample-data";
import { mapMemoryProductToDomainProduct } from "@/infra/adapters/product/memory/map-memory-product-to-domain-product";

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
    product = mapMemoryProductToDomainProduct(response);
  } catch (error) {
    console.error("Error while mapping API product to domain product: ", error);
    product = null;
  }

  return product;
}
