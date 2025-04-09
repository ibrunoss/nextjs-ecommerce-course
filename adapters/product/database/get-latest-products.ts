import { ProductEntity } from "@/domain/entities/product.entities";
import { getDatabaseLatestProducts } from "@/infra/services/product/get-database-latest-products";
import { mapDatabaseProductToDomainProduct } from "@/adapters/product/database/map-database-product-to-domain-product";
import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";
import { currencyGenericAdapter } from "@/adapters/currency/generic/currency.generic.adapter";

export async function getLatestProducts(): Promise<ProductEntity[]> {
  const response = await getDatabaseLatestProducts();
  let products: ProductEntity[];

  try {
    products = response.map((dbProduct) =>
      mapDatabaseProductToDomainProduct(
        dbProduct,
        dateGenericAdapter,
        currencyGenericAdapter
      )
    );
  } catch (error) {
    console.error(
      "Error while mapping API products to domain products: ",
      error
    );
    products = [];
  }

  return products;
}
