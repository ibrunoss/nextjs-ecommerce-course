import { CartEntity } from "@/domain/entities/cart.entity";
import { CartRepository } from "@/domain/repositories/cart.repository";
import { ProductRepository } from "@/domain/repositories/product.repository";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { GetOrCreateCartUseCase } from "@/domain/use-cases/cart/get-or-create-cart.use-case";
import { AddItemToCartUseCase } from "@/domain/use-cases/cart/add-item-to-cart.use-case";

type Input = {
  sessionCartId: string;
  userId?: string;
  cartItem: CartItemEntity;
};

type Output = {
  cart: CartEntity;
};

export function GetCartAndAddItemToCartUseCase(
  cartRepository: CartRepository,
  productRepository: ProductRepository
) {
  const execute = async ({
    sessionCartId = "",
    userId,
    cartItem,
  }: Input): Promise<Output> => {
    const getCart = GetOrCreateCartUseCase(cartRepository);

    let { cart } = await getCart.execute({ sessionCartId, userId });

    const addItemToCart = AddItemToCartUseCase(
      cartRepository,
      productRepository
    );

    const useCaseOutput = await addItemToCart.execute({ cart, cartItem });

    cart = useCaseOutput.cart;

    return { cart };
  };

  return { execute };
}
