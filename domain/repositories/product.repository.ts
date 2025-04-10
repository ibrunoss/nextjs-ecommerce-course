import { ProductEntity } from "@/domain/entities/product.entity";

export interface ProductRepository {
  create(product: ProductEntity): Promise<void>;
  delete(id: string): Promise<void>;
  findBySlug(slug: string): Promise<ProductEntity | null>;
  findById(idProduct: string): Promise<ProductEntity | null>;
  getLatest(): Promise<ProductEntity[]>;
  save(product: ProductEntity): Promise<void>;
}
