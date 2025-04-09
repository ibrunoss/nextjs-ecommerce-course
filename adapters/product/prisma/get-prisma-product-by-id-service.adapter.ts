import { ProductEntity } from "@/domain/entities/product.entities";
import { getPrismaProductByIdService } from "@/infra/services/product/get-prisma-product-by-id.service";
import { mapPrismaProductToDomainProduct } from "@/adapters/product/prisma/map-prisma-product-to-domain-product";
import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";
import { currencyGenericAdapter } from "@/adapters/currency/generic/currency.generic.adapter";

export async function getPrismaProductByIdServiceAdapter(
  id: string
): Promise<ProductEntity | null> {
  const response = await getPrismaProductByIdService(id);
  let product: ProductEntity | null;

  if (!response) {
    return null;
  }

  try {
    product = mapPrismaProductToDomainProduct(
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
