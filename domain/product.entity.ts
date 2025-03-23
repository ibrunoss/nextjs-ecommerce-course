export interface ProductEntity {
  id: string;
  name: string;
  price: number;
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
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}
