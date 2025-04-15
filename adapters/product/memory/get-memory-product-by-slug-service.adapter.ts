import { ProductEntity } from "@/domain/entities/product.entity";
import { productsInMemory } from "@/adapters/product/memory/db";
import { mapMemoryProductToDomainProduct } from "@/adapters/product/memory/map-memory-product-to-domain-product";

export async function getMemoryProductBySlugServiceAdapter(
  slug: string
): Promise<ProductEntity | null> {
  const response = productsInMemory.find((product) => product.id === slug);
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
