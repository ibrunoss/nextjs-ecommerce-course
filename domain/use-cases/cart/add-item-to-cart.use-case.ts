import { CartEntity } from "@/domain/entities/cart.entity";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";

type Input = {
  cart: CartEntity;
  cartItem: CartItemEntity;
  productStock: number;
};

type Output = {
  cart: CartEntity;
  itemAlreadyInCart: boolean;
};

type CheckIsAvailableParams = {
  stock: number;
  quantityToAdd: number;
  itemName: string;
};

const checkIsAvailable = ({
  quantityToAdd,
  stock,
  itemName,
}: CheckIsAvailableParams) => {
  if (stock < quantityToAdd) {
    throw new Error(`Quantidade de ${itemName} não disponível`);
  }
};

export function AddItemToCartUseCase(cartRepository: CartRepository) {
  const execute = async ({
    cart,
    cartItem,
    productStock,
  }: Input): Promise<Output> => {
    const itemFound = cart.getItemByProductId(cartItem.productId);
    const itemName = cartItem.name;
    let quantityToAdd = cartItem.quantity;
    const itemAlreadyInCart = itemFound !== undefined;

    if (itemAlreadyInCart) {
      quantityToAdd += itemFound.quantity;
    }

    checkIsAvailable({ itemName, quantityToAdd, stock: productStock });

    const cartUpdated = cart.addItem(cartItem);

    await cartRepository.save(cartUpdated);

    return { cart: cartUpdated, itemAlreadyInCart };
  };

  return { execute };
}
