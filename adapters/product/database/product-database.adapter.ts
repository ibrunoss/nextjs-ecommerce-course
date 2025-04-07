import { getLatestProducts } from "@/adapters/product/database/get-latest-products";
import { getProductBySlug } from "@/adapters/product/database/get-product-by-slug";
import { getProductById } from "@/adapters/product/database/get-product-by-id";
import { ProductAdapter } from "@/adapters/product/product.adapter";

export const productDatabaseAdapter: ProductAdapter = {
  getLatestProducts,
  getProductBySlug,
  getProductById,
};
