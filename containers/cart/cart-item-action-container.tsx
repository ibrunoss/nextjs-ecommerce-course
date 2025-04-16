"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { initialActionState } from "@/lib/actions/utils.actions";
import { toastSuccess } from "@/components/common/toast-success";
import { CART_VIEW_PATH } from "@/lib/constants/routes";
import { CartItemActionController } from "../../components/cart/cart-item-action-controller";

type Props = {
  cartItem: CartItemEntity;
  quantityInCart: number;
};

export const CartItemActionContainer = ({
  cartItem,
  quantityInCart,
}: Props) => {
  const router = useRouter();
  const onAddItem = async () => {
    const resp = await addItemToCart(initialActionState, cartItem);
    if (!resp.success) {
      toast.error(resp.message.title, {
        richColors: true,
        description: resp.errors.map((e) => e.message.description).join(", "),
      });
      return;
    }

    toastSuccess({
      title: resp.message.title ?? "",
      description: resp.message.description,
      button: {
        label: "Ver carrinho",
        onClick: () => router.push(CART_VIEW_PATH),
      },
    });
  };

  const onRemoveFromCart = async () => {
    /* TODO */
  };

  return (
    <CartItemActionController
      quantity={quantityInCart}
      onAddToCart={onAddItem}
      onRemoveFromCart={onRemoveFromCart}
    />
  );
};
