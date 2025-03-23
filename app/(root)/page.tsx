import { productDatabaseAdapter } from "@/adapters/product/database/product-database.adapter";
import { FeaturedProductList } from "@/components/product/featured-product-list";

export const metadata = {
  title: "Página Inicial",
};

const HomePage = async () => {
  const products = await productDatabaseAdapter.getLatestProducts();
  return <FeaturedProductList data={products} title="Novidades" />;
};

export default HomePage;
