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
  itemUpdated: CartItemEntity;
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
    const itemName = cartItem.product.name;
    let quantityToAdd = cartItem.quantity;
    const itemAlreadyInCart = itemFound !== undefined;

    if (itemAlreadyInCart) {
      quantityToAdd += itemFound.quantity;
    }

    checkIsAvailable({ itemName, quantityToAdd, stock: productStock });

    const cartToUpdate = cart.addItem(cartItem);
    const itemUpdated = cartToUpdate.getItemByProductId(cartItem.productId);

    if (!itemUpdated) {
      throw new Error("Item não encontrado no carrinho");
    }

    const cartUpdated = await cartRepository.save(cartToUpdate);

    return { cart: cartUpdated, itemAlreadyInCart, itemUpdated };
  };

  return { execute };
}
