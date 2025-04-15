import { ProductEntity } from "@/domain/entities/product.entity";
import { getPrismaProductByIdService } from "@/infra/services/product/get-prisma-product-by-id.service";
import { mapPrismaProductToDomainProduct } from "@/infra/adapters/product/prisma/map-prisma-product-to-domain-product";

export async function getPrismaProductByIdServiceAdapter(
  id: string
): Promise<ProductEntity | null> {
  const response = await getPrismaProductByIdService(id);
  let product: ProductEntity | null;

  if (!response) {
    return null;
  }

  try {
    product = mapPrismaProductToDomainProduct(response);
  } catch (error) {
    console.error("Error while mapping API product to domain product: ", error);
    product = null;
  }

  return product;
}
