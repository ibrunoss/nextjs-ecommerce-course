import { HTMLAttributes } from "react";
import { Plus } from "lucide-react";

import { ProductPrice } from "@/components/product/product-price";
import { Card, CardContent } from "@/components/ui/card";
import { RenderIf } from "@/components/common/render-if";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type ProductPurchaseCardProps = {
  idProduct: string;
  isAvailable: boolean;
  price: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const ProductPurchaseCard = ({
  isAvailable,
  price,
  ...props
}: ProductPurchaseCardProps) => {
  return (
    <div {...props}>
      <Card>
        <CardContent className="px-4">
          <div className="mb-2 flex justify-between">
            <div>Preço</div>
            <div>
              <ProductPrice value={price} />
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
  );
};
