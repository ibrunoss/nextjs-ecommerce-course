import { ProductEntity } from "@/domain/product.entity";
import { ProductDatabase } from "@/infra/db/types/product";

export function mapDatabaseProductToDomainProduct(
  dbProduct: ProductDatabase
): ProductEntity {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    category: dbProduct.category,
    description: dbProduct.description,
    images: dbProduct.images,
    price: Number(dbProduct.price),
    brand: dbProduct.brand,
    rating: Number(dbProduct.rating),
    reviews: Number(dbProduct.numReviews),
    stock: Number(dbProduct.stock),
    isFeatured: dbProduct.isFeatured,
    banner: dbProduct.banner ?? "",
    discount: 0, // Valor padrão
    colors: [], // Valor padrão
    sizes: [], // Valor padrão
    tags: [], // Valor padrão
    features: [], // Valor padrão
    bestSelling: false, // Valor padrão
    newArrival: false, // Valor padrão
    topRated: Number(dbProduct.rating) >= 4.5, // Produto é "top-rated" se tiver alta avaliação
    trending: false, // Valor padrão
    createdAt: new Date(dbProduct.createdAt), // Definindo a data atual como criação
    updatedAt: new Date(dbProduct.updatedAt), // Definindo a data atual como última atualização
  };
}
