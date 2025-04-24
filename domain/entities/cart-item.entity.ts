import { CurrencyEntity } from "@/domain/entities/currency.entity";
import { ProductEntity } from "./product.entity";

export interface CartItemEntity {
  id: string;
  cartId: string;
  productId: string;
  product: ProductEntity;
  quantity: number;
  price: CurrencyEntity;
}
