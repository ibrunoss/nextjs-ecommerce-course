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
  itemUpdated: CartItemEntity;
};

export function RemoveItemFromCartUseCase(cartRepository: CartRepository) {
  const execute = async ({
    cart,
    productId,
    quantity,
  }: Input): Promise<Output> => {
    const itemFound = cart.getItemByProductId(productId);

    if (!itemFound) {
      throw new Error("Item não encontrado no carrinho");
    }
    const isRemoved = !quantity || itemFound.quantity <= quantity;

    const quantityToRemove = quantity ?? itemFound.quantity;

    itemFound.quantity -= quantityToRemove;

    if (itemFound.quantity < 0) {
      itemFound.quantity = 0;
    }

    const cartToUpdate = cart.removeItem(itemFound);

    const cartUpdated = await cartRepository.save(cartToUpdate);

    return { cart: cartUpdated, isRemoved, itemUpdated: itemFound };
  };

  return { execute };
}
