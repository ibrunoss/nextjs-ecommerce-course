import { DateEntity, newDateEntity } from "@/domain/entities/date.entity";
import {
  CurrencyEntity,
  newCurrencyEntity,
} from "@/domain/entities/currency.entity";

export interface ProductEntity {
  id: string;
  name: string;
  price: CurrencyEntity;
  description: string;
  banner: string;
  images: string[];
  stock: number;
  discount: number;
  category: string;
  rating: number;
  reviews: number;
  brand: string;
  colors: string[];
  sizes: string[];
  tags: string[];
  features: string[];
  bestSelling: boolean;
  newArrival: boolean;
  topRated: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  trending: boolean;
  createdAt: DateEntity;
  updatedAt: DateEntity;
  slug: string;
}
export function newProductEntity(
  input: Partial<Omit<ProductEntity, "price" | "createdAt" | "updatedAt">> & {
    price?: string | number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  } = {}
): ProductEntity {
  return {
    id: input.id ?? crypto.randomUUID(),
    name: input.name ?? "Produto Genérico",
    price: newCurrencyEntity(input.price ?? 0),
    description: input.description ?? "",
    banner: input.banner ?? "",
    images: input.images ?? [],
    stock: input.stock ?? 0,
    discount: input.discount ?? 0,
    category: input.category ?? "Diversos",
    rating: input.rating ?? 0,
    reviews: input.reviews ?? 0,
    brand: input.brand ?? "Marca Desconhecida",
    colors: input.colors ?? [],
    sizes: input.sizes ?? [],
    tags: input.tags ?? [],
    features: input.features ?? [],
    bestSelling: input.bestSelling ?? false,
    newArrival: input.newArrival ?? false,
    topRated: input.topRated ?? false,
    isFeatured: input.isFeatured ?? false,
    isAvailable: input.isAvailable ?? true,
    trending: input.trending ?? false,
    createdAt: newDateEntity(input.createdAt ?? new Date()),
    updatedAt: newDateEntity(input.updatedAt ?? new Date()),
    slug: input.slug ?? "produto-generico",
  };
}
