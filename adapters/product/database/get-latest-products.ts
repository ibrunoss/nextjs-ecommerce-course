import { ProductEntity } from "@/domain/product.entity";
import { getDatabaseLatestProducts } from "@/infra/services/product/get-database-latest-products";
import { mapDatabaseProductToDomainProduct } from "@/adapters/product/database/map-database-product-to-domain-product";

export async function getLatestProducts(): Promise<ProductEntity[]> {
  const response = await getDatabaseLatestProducts();
  let products: ProductEntity[];

  try {
    products = response.map(mapDatabaseProductToDomainProduct);
  } catch (error) {
    console.error(
      "Error while mapping API products to domain products: ",
      error
    );
    products = [];
  }

  return products;
}
