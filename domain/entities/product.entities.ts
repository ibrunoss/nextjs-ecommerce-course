import { DateEntity } from "@/domain/entities/date.entities";
import { CurrencyEntity } from "@/domain/entities/currency.entities";

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
  trending: boolean;
  createdAt: DateEntity;
  updatedAt: DateEntity;
  slug: string;
}
