import { ProductAdapter } from "@/adapters/product-adapter";
import { Product } from "@/domain/Product";
import {
  APIProduct,
  getProductsFromDatabase,
} from "@/infra/services/product/get-products-from-database";

export function mapAPIProductToProduct(apiProduct: APIProduct): Product {
  return {
    id: crypto.randomUUID(), // Gerando um ID único (pode ser substituído por um valor real)
    name: apiProduct.name,
    slug: apiProduct.slug,
    category: apiProduct.category,
    description: apiProduct.description,
    images: apiProduct.images,
    price: apiProduct.price,
    brand: apiProduct.brand,
    rating: apiProduct.rating,
    reviews: apiProduct.numReviews,
    stock: apiProduct.stock,
    isFeatured: apiProduct.isFeatured,
    banner: apiProduct.banner ?? "",
    onSale: false, // Valor padrão
    discount: 0, // Valor padrão
    colors: [], // Valor padrão
    sizes: [], // Valor padrão
    tags: [], // Valor padrão
    features: [], // Valor padrão
    relatedProducts: [], // Valor padrão
    similarProducts: [], // Valor padrão
    bestSelling: false, // Valor padrão
    newArrival: false, // Valor padrão
    topRated: apiProduct.rating >= 4.5, // Produto é "top-rated" se tiver alta avaliação
    sale: false, // Valor padrão
    trending: false, // Valor padrão
    createdAt: new Date(), // Definindo a data atual como criação
    updatedAt: new Date(), // Definindo a data atual como última atualização
  };
}

export const productAPIAdapter: ProductAdapter = {
  async getProducts() {
    const response = await getProductsFromDatabase();
    let products: Product[];

    try {
      products = response.map(mapAPIProductToProduct);
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
