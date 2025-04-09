import { CurrencyEntity } from "@/domain/entities/currency.entities";
import { DateEntity } from "@/domain/entities/date.entities";

export interface CartEntity {
  id: string;
  sessionCartId: string;
  items: Array<CartItemEntity>;
  itemsPrice: CurrencyEntity;
  shippingPrice: CurrencyEntity;
  taxPrice: CurrencyEntity;
  totalPrice: CurrencyEntity;
  userId: string;
  createdAt: DateEntity;
  updatedAt: DateEntity;
}

export interface CartItemEntity {
  productId: string;
  name: string;
  slug: string;
  quantity: number;
  image: string;
  price: CurrencyEntity;
}
