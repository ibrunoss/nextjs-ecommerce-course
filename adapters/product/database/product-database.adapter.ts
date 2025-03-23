import { getLatestProducts } from "@/adapters/product/database/get-latest-products";
import { getProductBySlug } from "@/adapters/product/database/get-product-by-slug";
import { ProductAdapter } from "@/adapters/product/product.adapter";

export const productDatabaseAdapter: ProductAdapter = {
  getLatestProducts,
  getProductBySlug,
};
