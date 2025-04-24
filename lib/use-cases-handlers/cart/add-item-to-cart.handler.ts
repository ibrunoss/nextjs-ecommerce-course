import { revalidatePath } from "next/cache";

import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { ProductRepository } from "@/domain/repositories/product.repository";
import { AddItemToCartUseCase } from "@/domain/use-cases/cart/add-item-to-cart.use-case";
import { CartEntity } from "@/domain/entities/cart.entity";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";

type Input = {
  cart: CartEntity;
  cartItem: CartItemEntity;
};

type Output = {
  cart: CartEntity;
  itemAlreadyInCart: boolean;
  itemUpdated: CartItemEntity;
};

export async function addItemToCartHandler(
  cartRepository: CartRepository,
  productRepository: ProductRepository,
  input: Input
): Promise<Output> {
  const { cart, cartItem } = input;

  const product = await productRepository.findById(cartItem.productId);

  if (!product) {
    throw new Error(`Não foi possível localizar o ${cartItem.product.name}!`);
  }

  const useCase = AddItemToCartUseCase(cartRepository);
  const {
    cart: updatedCart,
    itemAlreadyInCart,
    itemUpdated,
  } = await useCase.execute({
    cart,
    cartItem,
    productStock: product.stock,
  });

  revalidatePath(PRODUCT_DETAIL_PATH(product.slug));

  return { cart: updatedCart, itemAlreadyInCart, itemUpdated };
}
