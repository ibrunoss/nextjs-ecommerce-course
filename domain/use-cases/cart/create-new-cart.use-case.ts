import { CartEntity } from "@/domain/entities/cart.entity";
import { createCurrencyEntity } from "@/domain/entities/currency.entity";
import { createDateEntity } from "@/domain/entities/date.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { cartEntitySchema } from "@/lib/validators/cart";

export type FindCartByUserOrSessionCartUseCaseParams = {
  cartRepository: CartRepository;
  sessionCartId: string;
  userId?: string;
};

export async function createNewCartUseCase({
  cartRepository,
  sessionCartId,
  userId,
}: FindCartByUserOrSessionCartUseCaseParams): Promise<CartEntity> {
  const cart: CartEntity = cartEntitySchema.parse({
    id: crypto.randomUUID(),
    userId,
    sessionCartId,
    items: [],
    itemsPrice: createCurrencyEntity(0),
    shippingPrice: createCurrencyEntity(0),
    taxPrice: createCurrencyEntity(0),
    totalPrice: createCurrencyEntity(0),
    createdAt: createDateEntity(new Date()),
    updatedAt: createDateEntity(new Date()),
  });

  await cartRepository.create(cart);

  return cart;
}
