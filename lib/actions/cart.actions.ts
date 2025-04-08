"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import {
  ActionState,
  CathActionError,
  getActionErrors,
} from "@/lib/actions/utils.actions";
import { CartEntity, CartItemEntity } from "@/domain/cart.entities";
import { auth } from "@/auth";
import { cartDatabaseAdapter } from "@/adapters/cart/database/cart-database.adapter";
import { productDatabaseAdapter } from "@/adapters/product/database/product-database.adapter";
import { round2 } from "@/lib/utils";
import { CurrencyEntity } from "@/domain/currency.entities";
import { currencyGenericAdapter } from "@/adapters/currency/generic/currency.generic.adapter";
import { dateGenericAdapter } from "@/adapters/date/generic/date-generic.adapter";
import { PRODUCT_DETAIL_PATH } from "@/lib/constants/routes";
import { productEntitySchema } from "@/lib/validators/product";
import { cartEntitySchema } from "@/lib/validators/cart";

export async function addItemToCart(
  prevState: ActionState,
  item: CartItemEntity
): Promise<ActionState> {
  try {
    const { sessionCartId, userId = "" } = await getSessionCartIdAndUserId();

    const cart = await getMyCart();

    const product = productEntitySchema.parse(
      await productDatabaseAdapter.getProductById(item.productId)
    );

    if (!cart) {
      const newCart: CartEntity = cartEntitySchema.parse({
        id: crypto.randomUUID(),
        userId,
        sessionCartId,
        items: [item],
        ...calcPrice([item]),
        createdAt: dateGenericAdapter.safeCreateEntity(new Date()),
        updatedAt: dateGenericAdapter.safeCreateEntity(new Date()),
      });
      await cartDatabaseAdapter.postCart(newCart);
      // Revalidate product page
      revalidatePath(PRODUCT_DETAIL_PATH(product.slug));

      console.log({
        "New Cart": newCart,
      });
    }
    // TESTING
    console.log({
      "Session Cart ID": cart?.id,
      "User ID": cart?.userId,
      "Item Requested": item,
      "Item Found": product,
    });

    return {
      success: true,
      message: `${item.name} adicionado ao carrinho`,
    };
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
  const itemsPrice = currencyGenericAdapter.safeCreateEntity(
    round2(
      items.reduce(
        (acc, item) => acc + item.price.numericValue * item.quantity,
        0
      )
    )
  );
  const shippingPrice = currencyGenericAdapter.safeCreateEntity(
    round2(itemsPrice.numericValue > 100 ? 0 : 10)
  );
  const taxPrice = currencyGenericAdapter.safeCreateEntity(
    round2(0.0138 * itemsPrice.numericValue)
  );
  const totalPrice = currencyGenericAdapter.safeCreateEntity(
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

  const cart = userId
    ? await cartDatabaseAdapter.getCartByUserId(userId)
    : await cartDatabaseAdapter.getCartBySessionCartId(sessionCartId);

  if (!cart) {
    return undefined;
  }

  return cart;
}
