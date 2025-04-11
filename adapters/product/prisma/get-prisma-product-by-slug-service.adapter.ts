import { ProductEntity } from "@/domain/entities/product.entity";
import { getPrismaProductBySlugService } from "@/infra/services/product/get-prisma-product-by-slug.service";
import { mapPrismaProductToDomainProduct } from "@/adapters/product/prisma/map-prisma-product-to-domain-product";
import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";

export async function getPrismaProductBySlugServiceAdapter(
  slug: string
): Promise<ProductEntity | null> {
  const response = await getPrismaProductBySlugService(slug);
  let product: ProductEntity | null;

  if (!response) {
    return null;
  }

  try {
    product = mapPrismaProductToDomainProduct(response, dateGenericAdapter);
  } catch (error) {
    console.error("Error while mapping API product to domain product: ", error);
    product = null;
  }

  return product;
}
