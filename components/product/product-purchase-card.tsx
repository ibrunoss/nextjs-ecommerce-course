import { HTMLAttributes } from "react";
import { Plus } from "lucide-react";

import { ProductPrice } from "@/components/product/product-price";
import { Card, CardContent } from "@/components/ui/card";
import { Render } from "@/components/common/render";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type ProductPurchaseCardProps = {
  idProduct: string;
  isAvailable: boolean;
  price: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const ProductPurchaseCard = ({
  isAvailable,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  idProduct,
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
              <Render
                when={isAvailable}
                fallback={<Badge variant="destructive">Fora de estoque</Badge>}
              >
                <Badge variant="outline">Em estoque</Badge>
              </Render>
            </div>
          </div>
          <Render when={isAvailable}>
            <div className="flex-center">
              <Button className="w-full">
                <Plus /> Adicionar ao carrinho
              </Button>
            </div>
          </Render>
        </CardContent>
      </Card>
    </div>
  );
};
