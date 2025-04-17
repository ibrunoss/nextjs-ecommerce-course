import { ProductEntity } from "@/domain/entities/product.entity";
import { getPrismaLatestProductsService } from "@/infra/services/product/get-prisma-latest-products.service";
import { productDatabaseToProductEntityMapper } from "@/infra/mappers/product/product-database-to-product-entity.mapper";

export async function getPrismaLatestProductsServiceAdapter(): Promise<
  ProductEntity[]
> {
  const response = await getPrismaLatestProductsService();
  let products: ProductEntity[];

  try {
    products = response.map((dbProduct) =>
      productDatabaseToProductEntityMapper(dbProduct)
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
