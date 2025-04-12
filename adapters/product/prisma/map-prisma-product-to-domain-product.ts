import { createCurrencyEntity } from "@/domain/entities/currency.entity";
import { createDateEntity } from "@/domain/entities/date.entity";
import { ProductEntity } from "@/domain/entities/product.entity";
import { ProductDatabase } from "@/infra/db/types/product";

export function mapPrismaProductToDomainProduct(
  dbProduct: ProductDatabase
): ProductEntity {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    category: dbProduct.category,
    description: dbProduct.description,
    images: dbProduct.images,
    price: createCurrencyEntity(dbProduct.price),
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
    createdAt: createDateEntity(dbProduct.createdAt), // Definindo a data atual como criação
    updatedAt: createDateEntity(dbProduct.updatedAt), // Definindo a data atual como última atualização
  };
}
