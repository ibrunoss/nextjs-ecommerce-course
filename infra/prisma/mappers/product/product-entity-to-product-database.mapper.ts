import { ProductEntity } from "@/domain/entities/product.entity";
import { ProductDatabase } from "@/infra/prisma/types/product";

export function productEntityToProductDatabaseMapper(
  product: ProductEntity
): ProductDatabase {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    description: product.description,
    images: product.images,
    price: String(product.price.numericValue),
    brand: product.brand,
    rating: String(product.rating),
    numReviews: product.reviews,
    stock: product.stock,
    isFeatured: product.isFeatured,
    banner: product.banner ?? "",
    createdAt: product.createdAt.date,
    updatedAt: product.updatedAt.date,
  };
}
