import {
  createCurrencyEntity,
  CurrencyEntity,
} from "@/domain/entities/currency.entity";
import { createDateEntity, DateEntity } from "@/domain/entities/date.entity";
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
  addItem(cartItem: CartItemEntity): void;
  removeItem(cartItem: CartItemEntity): void;
}

export const newCartEntity = (
  params?: Omit<Partial<CartEntity>, "addItem" | "removeItem">
): CartEntity => {
  const defaultValue: Required<typeof params> = {
    id: crypto.randomUUID(),
    userId: "",
    sessionCartId: "",
    items: [],
    itemsPrice: createCurrencyEntity(0),
    shippingPrice: createCurrencyEntity(0),
    taxPrice: createCurrencyEntity(0),
    totalPrice: createCurrencyEntity(0),
    createdAt: createDateEntity(new Date()),
    updatedAt: createDateEntity(new Date()),
    ...params,
  };

  const { createdAt, id, items, sessionCartId, userId } = defaultValue;
  let { itemsPrice, shippingPrice, taxPrice, totalPrice, updatedAt } =
    defaultValue;

  const updatePrices = () => {
    const updatedPrices = calcPrice(items);
    itemsPrice = updatedPrices.itemsPrice;
    shippingPrice = updatedPrices.shippingPrice;
    taxPrice = updatedPrices.taxPrice;
    totalPrice = updatedPrices.totalPrice;
    updatedAt = createDateEntity(new Date());
  };

  const addItem = (cartItem: CartItemEntity) => {
    const itemFound = items.find((x) => x.productId === cartItem.productId);

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
    updatePrices();
  };

  const removeItem = (cartItem: CartItemEntity) => {
    const itemIndex = items.findIndex(
      (x) => x.productId === cartItem.productId
    );

    if (itemIndex < 0) {
      return;
    }

    const itemFound = items[itemIndex];

    if (itemFound.quantity - cartItem.quantity <= 0) {
      items.splice(itemIndex, 1);
      updatePrices();
      return;
    }

    itemFound.quantity += cartItem.quantity;
    updatePrices();
  };

  return {
    addItem,
    removeItem,
    createdAt,
    id,
    items,
    itemsPrice,
    sessionCartId,
    shippingPrice,
    taxPrice,
    totalPrice,
    updatedAt,
    userId,
  };
};

// Calculate cart prices
function calcPrice(items: CartItemEntity[]): {
  itemsPrice: CurrencyEntity;
  shippingPrice: CurrencyEntity;
  taxPrice: CurrencyEntity;
  totalPrice: CurrencyEntity;
} {
  const itemsPrice = createCurrencyEntity(
    round2(
      items.reduce(
        (acc, item) => acc + item.price.numericValue * item.quantity,
        0
      )
    )
  );
  const shippingPrice = createCurrencyEntity(
    round2(itemsPrice.numericValue > 100 ? 0 : 10)
  );
  const taxPrice = createCurrencyEntity(
    round2(0.0138 * itemsPrice.numericValue)
  );
  const totalPrice = createCurrencyEntity(
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
