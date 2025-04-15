import { notFound } from "next/navigation";

import { productRepositoryAdapter } from "@/infra/adapters/product/product-repository.adapter";
import { ProductDetails } from "@/components/product/product-details";
import { ProductPurchaseCard } from "@/components/product/product-purchase-card";
import { ProductImages } from "@/components/product/product-images";

type ProductDetailsPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await productRepositoryAdapter.findBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Images Column */}
        <ProductImages
          className="col-span-2"
          productName={product.name}
          srcImages={product.images}
        />
        {/* Details Column */}
        <ProductDetails
          className="col-span-2"
          brand={product.brand}
          category={product.category}
          description={product.description}
          name={product.name}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
        />
        {/* Action Column */}
        <ProductPurchaseCard
          image={product.images[0]}
          isAvailable={product.stock > 0}
          name={product.name}
          price={product.price}
          productId={product.id}
          slug={product.slug}
        />
      </div>
    </section>
  );
}
