import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { FindCartByUserOrSessionCartUseCase } from "@/domain/use-cases/cart/find-cart-by-user-or-session-cart.use-case";
import { RemoveItemFromCartUseCase } from "@/domain/use-cases/cart/remove-item-from-cart.use-case";
import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";
import { revalidatePath } from "next/cache";

type Input = {
  sessionCartId: string;
  userId?: string;
  productId: string;
  quantity?: number; // (opcional) se quiser remover parcialmente
};

type Output = {
  cart: CartEntity;
  isRemoved: boolean;
  itemUpdated: CartItemEntity;
};

export async function getCartAndRemoveItemFromCartHandler(
  cartRepository: CartRepository,
  input: Input
): Promise<Output> {
  const { sessionCartId, userId, productId, quantity } = input;

  const getCart = FindCartByUserOrSessionCartUseCase(cartRepository);
  const { cart } = await getCart.execute({ sessionCartId, userId });

  if (!cart) {
    throw new Error("Carrinho não encontrado");
  }

  const removeItem = RemoveItemFromCartUseCase(cartRepository);

  const {
    cart: updatedCart,
    isRemoved,
    itemUpdated,
  } = await removeItem.execute({
    cart,
    productId,
    quantity,
  });

  revalidatePath(PRODUCT_DETAIL_PATH(itemUpdated.slug));

  return { cart: updatedCart, isRemoved, itemUpdated };
}
