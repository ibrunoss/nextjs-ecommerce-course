import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { ProductRepository } from "@/domain/repositories/product.repository";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { GetOrCreateCartUseCase } from "@/domain/use-cases/cart/get-or-create-cart.use-case";
import { addItemToCartHandler } from "@/lib/use-cases-handlers/cart/add-item-to-cart.handler";

type Input = {
  sessionCartId: string;
  userId?: string;
  cartItem: CartItemEntity;
};

type Output = {
  cart: CartEntity;
  itemAlreadyInCart: boolean;
};

export async function getCartAndAddItemToCartHandler(
  cartRepository: CartRepository,
  productRepository: ProductRepository,
  input: Input
): Promise<Output> {
  const { sessionCartId, userId, cartItem } = input;

  const getCart = GetOrCreateCartUseCase(cartRepository);
  const { cart } = await getCart.execute({ sessionCartId, userId });

  const { cart: updatedCart, itemAlreadyInCart } = await addItemToCartHandler(
    cartRepository,
    productRepository,
    { cart, cartItem }
  );

  return { cart: updatedCart, itemAlreadyInCart };
}
