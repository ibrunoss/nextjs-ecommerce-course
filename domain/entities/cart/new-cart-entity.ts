import {
  newCurrencyEntity,
  CurrencyEntity,
} from "@/domain/entities/currency.entity";
import { newDateEntity } from "@/domain/entities/date.entity";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { round2 } from "@/lib/utils";
import { CartEntity } from "@/domain/entities/cart/cart.entity";

export const newCartEntity = (
  params?: Omit<
    Partial<CartEntity>,
    "addItem" | "getItemByProductId" | "removeItem" | "updatePrices"
  >
): CartEntity => {
  const defaultValue: Required<typeof params> = {
    id: crypto.randomUUID(),
    userId: "",
    sessionCartId: "",
    items: [],
    itemsPrice: newCurrencyEntity(0),
    shippingPrice: newCurrencyEntity(0),
    taxPrice: newCurrencyEntity(0),
    totalPrice: newCurrencyEntity(0),
    createdAt: newDateEntity(new Date()),
    updatedAt: newDateEntity(new Date()),
    ...params,
  };

  const { createdAt, id, items, sessionCartId, userId, updatedAt } =
    defaultValue;

  const getItemByProductId = (productId: string) =>
    items.find((x) => x.productId === productId);
  const calcPricesWithUpdatedAt = (): CartPricesWithUpdatedAt => {
    return {
      ...calcPrice({
        items,
        shippingPrice: defaultValue.shippingPrice,
        taxPrice: defaultValue.taxPrice,
      }),
      updatedAt: newDateEntity(new Date()),
    };
  };

  const updatePrices = (): CartEntity => {
    return {
      addItem,
      getItemByProductId,
      removeItem,
      updatePrices,
      createdAt,
      id,
      items,
      sessionCartId,
      userId,
      ...calcPricesWithUpdatedAt(),
    };
  };

  const addItem = (cartItem: CartItemEntity): CartEntity => {
    const itemFound = getItemByProductId(cartItem.productId);

    const addNewItem = () => {
      items.push(cartItem);
    };

    const updateItem = () => {
      if (itemFound) {
        // Increase the quantity
        itemFound.quantity += cartItem.quantity;
      }
    };

    const action = itemFound ? "UPDATE_ITEM" : "ADD_NEW_ITEM";
    const addOrUpdate: Record<typeof action, () => void> = {
      ADD_NEW_ITEM: addNewItem,
      UPDATE_ITEM: updateItem,
    };

    addOrUpdate[action]();

    return {
      addItem,
      removeItem,
      getItemByProductId,
      updatePrices,
      createdAt,
      id,
      items,
      sessionCartId,
      userId,
      updatedAt,
      ...calcPrice({
        items,
        shippingPrice: defaultValue.shippingPrice,
        taxPrice: defaultValue.taxPrice,
      }),
    };
  };

  const removeItem = (productId: string, quantity?: number): CartEntity => {
    const itemIndex = items.findIndex((x) => x.productId === productId);

    if (itemIndex < 0) {
      return {
        addItem,
        getItemByProductId,
        removeItem,
        updatePrices,
        ...defaultValue,
        ...calcPricesWithUpdatedAt(),
      };
    }

    const itemFound = items[itemIndex];

    const quantityToRemove = quantity ?? itemFound.quantity;

    if (itemFound.quantity - quantityToRemove <= 0) {
      items.splice(itemIndex, 1);

      return {
        addItem,
        getItemByProductId,
        removeItem,
        updatePrices,
        createdAt,
        id,
        items,
        sessionCartId,
        userId,
        ...calcPricesWithUpdatedAt(),
      };
    }

    itemFound.quantity -= quantityToRemove;

    return {
      addItem,
      getItemByProductId,
      removeItem,
      updatePrices,
      createdAt,
      id,
      items,
      sessionCartId,
      userId,
      ...calcPricesWithUpdatedAt(),
    };
  };

  return {
    addItem,
    removeItem,
    updatePrices,
    getItemByProductId,
    ...defaultValue,
  };
};

type CartPrices = Pick<
  CartEntity,
  "itemsPrice" | "shippingPrice" | "taxPrice" | "totalPrice"
>;

type CartPricesWithUpdatedAt = CartPrices & Pick<CartEntity, "updatedAt">;

// Calculate cart prices
function calcPrice({
  items,
  shippingPrice,
  taxPrice,
}: {
  items: CartItemEntity[];
  shippingPrice: CurrencyEntity;
  taxPrice: CurrencyEntity;
}): CartPrices {
  const itemsPrice = newCurrencyEntity(
    round2(
      items.reduce(
        (acc, item) => acc + item.price.numericValue * item.quantity,
        0
      )
    )
  );
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
