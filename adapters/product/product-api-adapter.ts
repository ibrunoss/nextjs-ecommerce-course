import { ProductAdapter } from "@/adapters/product/product-adapter";
import { Product } from "@/domain/Product";
import { getLatestProducts } from "@/infra/services/product/get-latest-products";

export const productAPIAdapter: ProductAdapter = {
  async getProducts() {
    const response = await getLatestProducts();
    let products: Product[];

    try {
      products = response.map((apiProduct) => {
        return {
          id: apiProduct.id,
          name: apiProduct.name,
          slug: apiProduct.slug,
          category: apiProduct.category,
          description: apiProduct.description,
          images: apiProduct.images,
          price: Number(apiProduct.price),
          brand: apiProduct.brand,
          rating: Number(apiProduct.rating),
          reviews: Number(apiProduct.numReviews),
          stock: Number(apiProduct.stock),
          isFeatured: apiProduct.isFeatured,
          banner: apiProduct.banner ?? "",
          discount: 0, // Valor padrão
          colors: [], // Valor padrão
          sizes: [], // Valor padrão
          tags: [], // Valor padrão
          features: [], // Valor padrão
          bestSelling: false, // Valor padrão
          newArrival: false, // Valor padrão
          topRated: Number(apiProduct.rating) >= 4.5, // Produto é "top-rated" se tiver alta avaliação
          trending: false, // Valor padrão
          createdAt: new Date(apiProduct.createdAt), // Definindo a data atual como criação
          updatedAt: new Date(apiProduct.updatedAt), // Definindo a data atual como última atualização
        };
      });
    } catch (error) {
      console.error(
        "Error while mapping API products to domain products:",
        error
      );
      products = [];
    }

    return products;
  },
};
