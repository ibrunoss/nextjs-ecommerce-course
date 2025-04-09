import { prismaProductRepositoryAdapter } from "@/adapters/product/prisma-product-repository.adapter";
import { FeaturedProductList } from "@/components/product/featured/featured-product-list";

export const metadata = {
  title: "Página Inicial",
};

const HomePage = async () => {
  const products = await prismaProductRepositoryAdapter.getLatest();
  return <FeaturedProductList data={products} title="Novidades" />;
};

export default HomePage;
