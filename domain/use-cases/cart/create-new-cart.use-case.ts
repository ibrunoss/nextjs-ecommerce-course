import { CurrencyAdapter } from "@/adapters/currency/currency.adapter";
import { DateAdapter } from "@/adapters/date/date.adapter";
import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { cartEntitySchema } from "@/lib/validators/cart";

export type FindCartByUserOrSessionCartUseCaseParams = {
  cartRepository: CartRepository;
  currencyAdapter: CurrencyAdapter;
  dateAdapter: DateAdapter;
  sessionCartId: string;
  userId?: string;
};

export async function createNewCartUseCase({
  cartRepository,
  currencyAdapter,
  sessionCartId,
  dateAdapter,
  userId,
}: FindCartByUserOrSessionCartUseCaseParams): Promise<CartEntity> {
  const cart: CartEntity = cartEntitySchema.parse({
    id: crypto.randomUUID(),
    userId,
    sessionCartId,
    items: [],
    itemsPrice: currencyAdapter.safeCreateEntity(0),
    shippingPrice: currencyAdapter.safeCreateEntity(0),
    taxPrice: currencyAdapter.safeCreateEntity(0),
    totalPrice: currencyAdapter.safeCreateEntity(0),
    createdAt: dateAdapter.safeCreateEntity(new Date()),
    updatedAt: dateAdapter.safeCreateEntity(new Date()),
  });

  await cartRepository.create(cart);

  return cart;
}
