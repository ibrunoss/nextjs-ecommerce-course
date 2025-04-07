import { ProductEntity } from "@/domain/product.entities";

export interface ProductAdapter {
  getLatestProducts(): Promise<ProductEntity[]>;
  getProductBySlug(slug: string): Promise<ProductEntity | null>;
  getProductById(id: string): Promise<ProductEntity | null>;
}
