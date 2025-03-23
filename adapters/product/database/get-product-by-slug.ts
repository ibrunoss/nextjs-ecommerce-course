import { ProductEntity } from "@/domain/product.entity";
import { getDatabaseProductBySlug } from "@/infra/services/product/get-database-product-by-slug";
import { mapDatabaseProductToDomainProduct } from "@/adapters/product/database/map-database-product-to-domain-product";

export async function getProductBySlug(
  slug: string
): Promise<ProductEntity | null> {
  const response = await getDatabaseProductBySlug(slug);
  let product: ProductEntity | null;

  if (!response) {
    return null;
  }

  try {
    product = mapDatabaseProductToDomainProduct(response);
  } catch (error) {
    console.error("Error while mapping API product to domain product: ", error);
    product = null;
  }

  return product;
}
