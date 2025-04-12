"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import {
  ActionState,
  CathActionError,
  getActionErrors,
} from "@/lib/actions/utils.actions";
import { CartEntity, newCartEntity } from "@/domain/entities/cart.entity";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { auth } from "@/auth";
import { prismaCartRepositoryAdapter } from "@/adapters/cart/prisma-cart-repository.adapter";
import { prismaProductRepositoryAdapter } from "@/adapters/product/prisma-product-repository.adapter";
import { round2 } from "@/lib/utils";
import {
  newCurrencyEntity,
  CurrencyEntity,
} from "@/domain/entities/currency.entity";
import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";
import { productEntitySchema } from "@/lib/validators/product";
import { findCartByUserOrSessionCartUseCase } from "@/domain/use-cases/cart/find-cart-by-user-or-session-cart.use-case";
import { getOrCreateCartUseCase } from "@/domain/use-cases/cart/get-or-create-cart.use-case";
import { newDateEntity } from "@/domain/entities/date.entity";

export async function addItemToCart(
  prevState: ActionState,
  item: CartItemEntity
): Promise<ActionState> {
  try {
    const { sessionCartId, userId = "" } = await getSessionCartIdAndUserId();

    const cart = await getOrCreateCartUseCase({
      sessionCartId,
      userId,
      cartRepository: prismaCartRepositoryAdapter,
    });

    const product = productEntitySchema.parse(
      await prismaProductRepositoryAdapter.findById(item.productId)
    );

    const replyItemAdded: ActionState = {
      success: true,
      message: `${item.name} adicionado ao carrinho`,
    };

    if (!cart) {
      const newCart: CartEntity = newCartEntity({
        id: crypto.randomUUID(),
        userId,
        sessionCartId,
        items: [item],
        ...calcPrice([item]),
        createdAt: newDateEntity(new Date()),
        updatedAt: newDateEntity(new Date()),
      });
      await prismaCartRepositoryAdapter.create(newCart);
      // Revalidate product page
      revalidatePath(PRODUCT_DETAIL_PATH(product.slug));

      return replyItemAdded;
    }

    const itemFound = cart.items.find((x) => x.productId === product.id);

    if (itemFound) {
      // Check stock
      if (product.stock < itemFound.quantity + item.quantity) {
        throw new Error(`Quantidade de ${item.name} não disponível`);
      }

      // Increase the quantity
      itemFound.quantity += item.quantity;

      const updatedCart: CartEntity = newCartEntity({
        ...cart,
        ...calcPrice(cart.items),
      });
      await prismaCartRepositoryAdapter.create(updatedCart);

      // Revalidate product page
      revalidatePath(PRODUCT_DETAIL_PATH(product.slug));

      return replyItemAdded;
    }

    // Check stock
    if (product.stock < item.quantity) {
      throw new Error(`Quantidade de ${item.name} não disponível`);
    }
    cart.items.push(item);
    const updatedCart: CartEntity = newCartEntity({
      ...cart,
      ...calcPrice(cart.items),
    });

    await prismaCartRepositoryAdapter.create(updatedCart);

    // Revalidate product page
    revalidatePath(PRODUCT_DETAIL_PATH(product.slug));

    // TESTING
    console.log({
      "Session Cart ID": cart.id,
      "User ID": cart.userId,
      Items: cart.items,
      "Item Requested": item,
      "Item Found": product,
    });

    return replyItemAdded;
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    const error = e as CathActionError;

    return getActionErrors({ error });
  }
}

// Calculate cart prices
function calcPrice(items: CartItemEntity[]): {
  itemsPrice: CurrencyEntity;
  shippingPrice: CurrencyEntity;
  taxPrice: CurrencyEntity;
  totalPrice: CurrencyEntity;
} {
  const itemsPrice = newCurrencyEntity(
    round2(
      items.reduce(
        (acc, item) => acc + item.price.numericValue * item.quantity,
        0
      )
    )
  );
  const shippingPrice = newCurrencyEntity(
    round2(itemsPrice.numericValue > 100 ? 0 : 10)
  );
  const taxPrice = newCurrencyEntity(round2(0.0138 * itemsPrice.numericValue));
  const totalPrice = newCurrencyEntity(
    round2(
      itemsPrice.numericValue +
        taxPrice.numericValue +
        shippingPrice.numericValue
    )
  );

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
}

async function getSessionCartIdAndUserId(): Promise<{
  sessionCartId: string;
  userId?: string;
}> {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) {
    throw new Error("Não foi possível encontrar o ID do carrinho na sessão");
  }

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id;

  return {
    sessionCartId,
    userId,
  };
}

export async function getMyCart(): Promise<CartEntity | undefined> {
  const { sessionCartId, userId } = await getSessionCartIdAndUserId();

  const cart = await findCartByUserOrSessionCartUseCase({
    userId,
    sessionCartId,
    cartRepository: prismaCartRepositoryAdapter,
  });

  if (!cart) {
    return undefined;
  }

  return cart;
}
