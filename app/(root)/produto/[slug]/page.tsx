import { notFound } from "next/navigation";

import { productDatabaseAdapter } from "@/adapters/product/database/product-database.adapter";
import { ProductDetails } from "@/components/product/product-details";
import { ProductPurchaseCard } from "@/components/product/product-purchase-card";

type ProductDetailsPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await productDatabaseAdapter.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Images Column */}
        <div className="col-span-2">{/* Images Component */}</div>
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
          idProduct={product.id}
          isAvailable={product.stock > 0}
          price={product.price}
        />
      </div>
    </section>
  );
}
