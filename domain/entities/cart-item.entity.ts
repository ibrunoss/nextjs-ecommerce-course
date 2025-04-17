import { CurrencyEntity } from "@/domain/entities/currency.entity";

export interface CartItemEntity {
  productId: string;
  name: string;
  slug: string;
  quantity: number;
  image: string;
  price: CurrencyEntity;
}
