import { ProductEntity } from "@/domain/entities/product.entity";
import { productsInMemory } from "@/infra/adapters/product/memory/db";
import { mapMemoryProductToDomainProduct } from "@/infra/adapters/product/memory/map-memory-product-to-domain-product";

export async function getMemoryProductByIdServiceAdapter(
  id: string
): Promise<ProductEntity | null> {
  const response = productsInMemory.find((product) => product.id === id);

  if (!response) {
    return null;
  }

  const product: ProductEntity | null =
    mapMemoryProductToDomainProduct(response);

  return product;
}
