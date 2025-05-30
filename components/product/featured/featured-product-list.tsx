import { ProductEntity } from "@/domain/entities/product.entity";
import { Render } from "@/components/common/render";
import { FeaturedProductCard } from "@/components/product/featured/card/featured-product-card";
import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";

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
          {limitedData.map((product) => {
            return (
              <FeaturedProductCard
                key={product.slug}
                brand={product.brand}
                isAvailable={product.stock > 0}
                link={PRODUCT_DETAIL_PATH(product.slug)}
                name={product.name}
                price={product.price}
                rating={product.rating}
                imageAlt={product.name}
                imageSrc={product.images[0]}
              />
            );
          })}
        </div>
      </Render>
    </div>
  );
};
