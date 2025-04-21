import {
  newCurrencyEntity,
  CurrencyEntity,
} from "@/domain/entities/currency.entity";
import { newDateEntity, DateEntity } from "@/domain/entities/date.entity";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { round2 } from "@/lib/utils";

export interface CartEntity {
  id: string;
  sessionCartId: string;
  items: Array<CartItemEntity>;
  itemsPrice: CurrencyEntity;
  shippingPrice: CurrencyEntity;
  taxPrice: CurrencyEntity;
  totalPrice: CurrencyEntity;
  userId: string;
  createdAt: DateEntity;
  updatedAt: DateEntity;
  addItem(cartItem: CartItemEntity): CartEntity;
  removeItem(productId: string, quantityToRemove?: number): CartEntity;
  getItemByProductId(productId: string): CartItemEntity | undefined;
}

export const newCartEntity = (
  params?: Omit<
    Partial<CartEntity>,
    "addItem" | "removeItem" | "getItemByProductId"
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

  const { createdAt, id, items, sessionCartId, userId } = defaultValue;

  const updatePrices = (): CartPricesWithUpdatedAt => {
    return {
      ...calcPrice(items),
      updatedAt: newDateEntity(new Date()),
    };
  };

  const getItemByProductId = (productId: string) =>
    items.find((x) => x.productId === productId);

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
      createdAt,
      id,
      items,
      sessionCartId,
      userId,
      ...updatePrices(),
    };
  };

  const removeItem = (productId: string, quantity?: number): CartEntity => {
    const itemIndex = items.findIndex((x) => x.productId === productId);

    if (itemIndex < 0) {
      return {
        addItem,
        removeItem,
        getItemByProductId,
        ...defaultValue,
      };
    }

    const itemFound = items[itemIndex];

    const quantityToRemove = quantity ?? itemFound.quantity;

    if (itemFound.quantity - quantityToRemove <= 0) {
      items.splice(itemIndex, 1);

      return {
        addItem,
        removeItem,
        getItemByProductId,
        createdAt,
        id,
        items,
        sessionCartId,
        userId,
        ...updatePrices(),
      };
    }

    itemFound.quantity -= quantityToRemove;

    return {
      addItem,
      removeItem,
      getItemByProductId,
      createdAt,
      id,
      items,
      sessionCartId,
      userId,
      ...updatePrices(),
    };
  };

  return {
    addItem,
    removeItem,
    getItemByProductId,
    ...defaultValue,
  };
};

type CartPrices = {
  itemsPrice: CurrencyEntity;
  shippingPrice: CurrencyEntity;
  taxPrice: CurrencyEntity;
  totalPrice: CurrencyEntity;
};

type CartPricesWithUpdatedAt = CartPrices & {
  updatedAt: DateEntity;
};

// Calculate cart prices
function calcPrice(items: CartItemEntity[]): CartPrices {
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
  const taxPrice = newCurrencyEntity(round2(0 * itemsPrice.numericValue));
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
