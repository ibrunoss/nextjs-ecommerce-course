import sampleData from "@/infra/db/sample-data";

export interface APIProduct {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;
  banner: string | null;
}

export async function getProductsFromDatabase(): Promise<APIProduct[]> {
  return sampleData.products;
}
