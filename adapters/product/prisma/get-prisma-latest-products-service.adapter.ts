import { ProductEntity } from "@/domain/entities/product.entity";
import { getPrismaLatestProductsService } from "@/infra/services/product/get-prisma-latest-products.service";
import { mapPrismaProductToDomainProduct } from "@/adapters/product/prisma/map-prisma-product-to-domain-product";

export async function getPrismaLatestProductsServiceAdapter(): Promise<
  ProductEntity[]
> {
  const response = await getPrismaLatestProductsService();
  let products: ProductEntity[];

  try {
    products = response.map((dbProduct) =>
      mapPrismaProductToDomainProduct(dbProduct)
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
