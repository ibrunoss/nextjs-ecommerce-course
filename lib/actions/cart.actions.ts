"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";

import {
  ActionState,
  CathActionError,
  getActionErrors,
} from "@/lib/actions/utils.actions";
import { CartEntity, CartItemEntity } from "@/domain/cart.entities";
import { auth } from "@/auth";
import { cartDatabaseAdapter } from "@/adapters/cart/database/cart-database.adapter";
import { cartItemDatabaseSchema } from "@/lib/validators/cart";
import { mapDomainCartItemToDatabaseCartItem } from "@/adapters/cart/database/map-domain-cart-item-to-database-cart-item";
import { productDatabaseAdapter } from "@/adapters/product/database/product-database.adapter";

export async function addItemToCart(
  prevState: ActionState,
  data: CartItemEntity
): Promise<ActionState> {
  try {
    const cart = await getMyCart();

    const item = cartItemDatabaseSchema.parse(
      mapDomainCartItemToDatabaseCartItem(data)
    );
    const product = await productDatabaseAdapter.getProductById(item.productId);
    // TESTING
    console.log({
      "Session Cart ID": cart?.id,
      "User ID": cart?.userId,
      "Item Requested": item,
      "Item Found": product,
    });

    return {
      success: true,
      message: `${data.name} adicionado ao carrinho`,
    };
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    const error = e as CathActionError;

    return getActionErrors({ error });
  }
}

export async function getMyCart(): Promise<CartEntity | undefined> {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) {
    throw new Error("Não foi possível encontrar o ID do carrinho na sessão");
  }

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id;

  const cart = userId
    ? await cartDatabaseAdapter.getCartByUserId(userId)
    : await cartDatabaseAdapter.getCartBySessionCartId(sessionCartId);

  if (!cart) {
    return undefined;
  }

  return cart;
}
