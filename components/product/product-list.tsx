import { Product } from "@/domain/Product";
import { RenderIf } from "../common/render-if";

type ProductListProps = {
  data: Product[];
  title?: string;
  limit?: number;
};
export const ProductList = ({ data, limit, title }: ProductListProps) => {
  const hasProducts = data.length > 0;
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      <RenderIf when={hasProducts} fallback={<p>Nenhum produto encontrado.</p>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      </RenderIf>
    </div>
  );
};
