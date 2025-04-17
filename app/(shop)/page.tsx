import { productRepositoryAdapter } from "@/infra/adapters/product/product-repository.adapter";
import { FeaturedProductList } from "@/components/product/featured/featured-product-list";

export const metadata = {
  title: "Página Inicial",
};

const HomePage = async () => {
  const products = await productRepositoryAdapter.getLatest();
  return <FeaturedProductList data={products} title="Novidades" />;
};

export default HomePage;
