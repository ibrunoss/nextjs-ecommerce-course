import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";

type Input = {
  cart: CartEntity;
  productId: string;
  quantity?: number; // (opcional) se quiser remover parcialmente
};

type Output = {
  cart: CartEntity;
  isRemoved: boolean;
  itemUpdated?: CartItemEntity;
};

export function RemoveItemFromCartUseCase(cartRepository: CartRepository) {
  const execute = async ({
    cart,
    productId,
    quantity,
  }: Input): Promise<Output> => {
    const cartToUpdate = cart.removeItem(productId, quantity);

    const cartUpdated = await cartRepository.save(cartToUpdate);
    const itemFound = cartToUpdate.getItemByProductId(productId);
    const isRemoved = !itemFound;

    return { cart: cartUpdated, isRemoved, itemUpdated: itemFound };
  };

  return { execute };
}
