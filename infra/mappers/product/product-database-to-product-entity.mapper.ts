import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { newDateEntity } from "@/domain/entities/date.entity";
import { ProductEntity } from "@/domain/entities/product.entity";
import { ProductDatabase } from "@/infra/types/product";

export function productDatabaseToProductEntityMapper(
  dbProduct: ProductDatabase
): ProductEntity {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    category: dbProduct.category,
    description: dbProduct.description,
    images: dbProduct.images,
    price: newCurrencyEntity(dbProduct.price),
    brand: dbProduct.brand,
    rating: Number(dbProduct.rating),
    reviews: Number(dbProduct.numReviews),
    stock: Number(dbProduct.stock),
    isFeatured: dbProduct.isFeatured,
    isAvailable: Number(dbProduct.stock) > 0,
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
    createdAt: newDateEntity(dbProduct.createdAt), // Definindo a data atual como criação
    updatedAt: newDateEntity(dbProduct.updatedAt), // Definindo a data atual como última atualização
  };
}
