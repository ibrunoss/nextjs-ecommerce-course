import { newCurrencyEntity } from "@/domain/entities/currency.entity";
import { newDateEntity } from "@/domain/entities/date.entity";
import { ProductEntity } from "@/domain/entities/product.entity";
import { ProductMemory } from "@/infra/types/product";

export function memoryProductToProductEntityMapper(
  product: ProductMemory
): ProductEntity {
  return {
    id: product.id,
    name: product.nome,
    slug: product.id,
    category: "Sem Categoria",
    description: product.descricao,
    images: [product.imagem],
    price: newCurrencyEntity(product.preco),
    brand: product.marca,
    rating: 0,
    reviews: 0,
    stock: product.estoque,
    isAvailable: product.estoque > 0, // Valor padrão
    isFeatured: false, // Valor padrão
    banner: "", // Valor padrão
    discount: 0, // Valor padrão
    colors: [], // Valor padrão
    sizes: [], // Valor padrão
    tags: [], // Valor padrão
    features: [], // Valor padrão
    bestSelling: false, // Valor padrão
    newArrival: false, // Valor padrão
    topRated: false, // Valor padrão
    trending: false, // Valor padrão
    createdAt: newDateEntity(new Date()), // Definindo a data atual como criação
    updatedAt: newDateEntity(new Date()), // Definindo a data atual como última atualização
  };
}
