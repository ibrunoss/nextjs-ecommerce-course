import { ProductEntity } from "@/domain/entities/product.entity";
import { memorySampleData } from "@/infra/db/memory-sample-data";
import { mapMemoryProductToDomainProduct } from "@/infra/adapters/product/memory/map-memory-product-to-domain-product";

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
    mapMemoryProductToDomainProduct(response);

  return product;
}
