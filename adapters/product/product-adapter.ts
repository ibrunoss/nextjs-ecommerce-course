import { Product } from "@/domain/Product";

export interface ProductAdapter {
  getProducts(): Promise<Product[]>;
}
