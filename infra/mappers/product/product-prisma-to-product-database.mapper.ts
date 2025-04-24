import { ProductDatabase, ProductPrisma } from "@/infra/types/product";

export function productPrismaToProductDatabaseMapper(
  dbProduct: ProductPrisma
): ProductDatabase {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    category: dbProduct.category,
    description: dbProduct.description,
    images: dbProduct.images,
    price: String(dbProduct.price),
    brand: dbProduct.brand,
    rating: String(dbProduct.rating),
    numReviews: Number(dbProduct.numReviews),
    stock: Number(dbProduct.stock),
    isFeatured: dbProduct.isFeatured,
    banner: dbProduct.banner ?? "",
    createdAt: new Date(dbProduct.createdAt), // Definindo a data atual como criação
    updatedAt: new Date(dbProduct.updatedAt), // Definindo a data atual como última atualização
  };
}
