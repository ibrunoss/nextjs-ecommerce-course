import { revalidatePath } from "next/cache";

import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { ProductRepository } from "@/domain/repositories/product.repository";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";

type Input = {
  cart: CartEntity;
  cartItem: CartItemEntity;
};

type Output = {
  cart: CartEntity;
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

export function AddItemToCartUseCase(
  cartRepository: CartRepository,
  productRepository: ProductRepository
) {
  const execute = async ({ cart, cartItem }: Input): Promise<Output> => {
    const product = await productRepository.findById(cartItem.productId);

    if (!product) {
      throw new Error(`Não foi possível localizar o ${cartItem.name}!`);
    }

    const itemFound = cart.getItemByProductId(cartItem.productId);

    const { stock } = product;
    const itemName = cartItem.name;
    let quantityToAdd = cartItem.quantity;

    if (itemFound) {
      quantityToAdd += itemFound.quantity;
    }

    checkIsAvailable({ itemName, quantityToAdd, stock });

    cart.addItem(cartItem);

    cartRepository.save(cart);
    // Revalidate product page
    revalidatePath(PRODUCT_DETAIL_PATH(product.slug));

    return { cart };
  };

  return { execute };
}
