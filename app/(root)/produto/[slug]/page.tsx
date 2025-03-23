import { notFound } from "next/navigation";

import { productDatabaseAdapter } from "@/adapters/product/database/product-database.adapter";
import { ProductPrice } from "@/components/product/product-price";
import { Card, CardContent } from "@/components/ui/card";
import { RenderIf } from "@/components/common/render-if";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

  const isAvailable = product.stock > 0;
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Images Column */}
        <div className="col-span-2">{/* Images Component */}</div>
        {/* Details Column */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p>
              {product.brand} {product.category}
            </p>
            <h1 className="h3-bold">{product.name}</h1>
            <p>
              {product.rating} de {product.reviews} Avaliações
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <ProductPrice
                className="w-28 rounded-full bg-green-100 text-green-700 px-5 py-2"
                value={product.price}
              />
            </div>
          </div>
          <div className="mt-10">
            <p className="font-semibold">Descrição</p>
            <p>{product.description}</p>
          </div>
        </div>
        {/* Action Column */}
        <div>
          <Card>
            <CardContent className="px-4">
              <div className="mb-2 flex justify-between">
                <div>Preço</div>
                <div>
                  <ProductPrice value={product.price} />
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Situação</div>
                <div>
                  <RenderIf when={isAvailable}>
                    <Badge variant="outline">Em estoque</Badge>
                  </RenderIf>
                  <RenderIf when={!isAvailable}>
                    <Badge variant="destructive">Fora de estoque</Badge>
                  </RenderIf>
                </div>
              </div>
              <RenderIf when={isAvailable}>
                <div className="flex-center">
                  <Button className="w-full">
                    <Plus /> Adicionar ao carrinho
                  </Button>
                </div>
              </RenderIf>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
