import { ProductEntity } from "@/domain/product.entity";
import { Render } from "@/components/common/render";
import { FeaturedProductCard } from "./card/featured-product-card";

export type FeaturedProductListProps = {
  data: ProductEntity[];
  title?: string;
  limit?: number;
};
export const FeaturedProductList = ({
  data,
  limit,
  title,
}: FeaturedProductListProps) => {
  const hasProducts = data.length > 0;
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      <Render when={hasProducts} fallback={<p>Nenhum produto encontrado.</p>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product) => (
            <FeaturedProductCard
              key={product.slug}
              brand={product.brand}
              isAvailable={product.stock > 0}
              link={`/produto/${product.slug}`}
              name={product.name}
              price={product.price}
              rating={product.rating}
              imageAlt={product.name}
              imageSrc={product.images[0]}
            />
          ))}
        </div>
      </Render>
    </div>
  );
};
