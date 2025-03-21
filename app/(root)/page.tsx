import { productAPIAdapter } from "@/adapters/product/product-api-adapter";
import { FeaturedProductList } from "@/components/product/featured-product-list";

export const metadata = {
  title: "Página Inicial",
};

const HomePage = async () => {
  const products = await productAPIAdapter.getProducts();
  return <FeaturedProductList data={products} title="Novidades" />;
};

export default HomePage;
