import { productAPIAdapter } from "@/adapters/product/product-api-adapter";
import { ProductList } from "@/components/product/product-list";

export const metadata = {
  title: "Página Inicial",
};

const HomePage = async () => {
  const products = await productAPIAdapter.getProducts();
  return <ProductList data={products} title="Novidades" limit={4} />;
};

export default HomePage;
