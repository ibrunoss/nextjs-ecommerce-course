import { ProductEntity } from "@/domain/entities/product.entities";
import { getDatabaseProductById } from "@/infra/services/product/get-database-product-by-id";
import { mapDatabaseProductToDomainProduct } from "@/adapters/product/database/map-database-product-to-domain-product";
import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";
import { currencyGenericAdapter } from "@/adapters/currency/generic/currency.generic.adapter";

export async function getProductById(
  id: string
): Promise<ProductEntity | null> {
  const response = await getDatabaseProductById(id);
  let product: ProductEntity | null;

  if (!response) {
    return null;
  }

  try {
    product = mapDatabaseProductToDomainProduct(
      response,
      dateGenericAdapter,
      currencyGenericAdapter
    );
  } catch (error) {
    console.error("Error while mapping API product to domain product: ", error);
    product = null;
  }

  return product;
}
