import { ProductEntity } from "@/domain/product.entity";

export interface ProductAdapter {
  getLatestProducts(): Promise<ProductEntity[]>;
  getProductBySlug(slug: string): Promise<ProductEntity | null>;
}
