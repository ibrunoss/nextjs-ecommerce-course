import { notFound } from "next/navigation";

import { productRepositoryAdapter } from "@/infra/adapters/product/product-repository.adapter";
import { ProductDetails } from "@/components/product/product-details";
import { ProductPurchaseCard } from "@/components/product/product-purchase-card";
import { ProductImages } from "@/components/product/product-images";
import { getCart } from "@/lib/actions/cart.actions";
import { initialActionDataState } from "@/lib/actions/utils.actions";
import { newCartEntity } from "@/domain/entities/cart.entity";

type ProductDetailsPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await productRepositoryAdapter.findBySlug(slug);

  const { data: cart } = await getCart(initialActionDataState(newCartEntity()));

  if (!product) {
    notFound();
  }

  const itemFound = cart.getItemByProductId(product.id);
  const quantityInCart = itemFound?.quantity || 0;

  console.log("itemFound", itemFound);
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
          quantityInCart={quantityInCart}
        />
      </div>
    </section>
  );
}
