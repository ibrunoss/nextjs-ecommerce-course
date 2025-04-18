"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { addItemToCart } from "@/lib/actions/cart.actions/add-item-to-cart.action";
import { removeItemFromCart } from "@/lib/actions/cart.actions/remove-item-from-cart.action";
import { ActionState, initialActionState } from "@/lib/actions/utils.actions";
import { CART_VIEW_PATH } from "@/lib/constants/routes";
import { toastSuccess } from "@/components/common/toast-success";

type Props = {
  cartItem: CartItemEntity;
  children: (props: {
    isPending: boolean;
    onAddToCart?: () => void | Promise<void>;
    onRemoveFromCart?: () => void | Promise<void>;
  }) => React.ReactNode;
};

export const CartItemActionHandler = ({ cartItem, children }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCartAction = async (
    action: (state: ActionState, item: CartItemEntity) => Promise<ActionState>
  ) => {
    startTransition(async () => {
      const response = await action(initialActionState, cartItem);
      if (!response.success) {
        toast.error(response.message.title, {
          richColors: true,
          description: response.errors
            .map((e) => e.message.description)
            .join(", "),
        });
        return;
      }

      toastSuccess({
        title: response.message.title ?? "",
        description: response.message.description,
        button: {
          label: "Ver carrinho",
          onClick: () => router.push(CART_VIEW_PATH),
        },
      });
    });
  };

  return (
    <>
      {children({
        isPending,
        onAddToCart: () => handleCartAction(addItemToCart),
        onRemoveFromCart: () => handleCartAction(removeItemFromCart),
      })}
    </>
  );
};
