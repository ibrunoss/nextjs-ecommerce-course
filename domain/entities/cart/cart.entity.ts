import { CurrencyEntity } from "@/domain/entities/currency.entity";
import { DateEntity } from "@/domain/entities/date.entity";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";

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
  addItem(cartItem: CartItemEntity): CartEntity;
  getItemByProductId(productId: string): CartItemEntity | undefined;
  removeItem(productId: string, quantityToRemove?: number): CartEntity;
  updatePrices(): CartEntity;
}
