"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CartItemEntity } from "@/domain/entities/cart-item.entity";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { initialActionState } from "@/lib/actions/utils.actions";
import { toastSuccess } from "@/components/common/toast-success";

export type AddProductToCartProps = { cartItem: CartItemEntity };

export const AddProductToCart = ({ cartItem }: AddProductToCartProps) => {
  const router = useRouter();
  const handleClick = async () => {
    const resp = await addItemToCart(initialActionState, cartItem);
    if (!resp.success) {
      toast.error(resp.message, {
        richColors: true,
        description: resp.errors.map((e) => e.message).join(", "),
      });
      return;
    }

    toastSuccess({
      title: "Adicionado ao carrinho",
      description: `${cartItem.quantity}x ${cartItem.name}`,
      button: {
        label: "Ver carrinho",
        onClick: () => router.push("/carrinho"),
      },
    });
  };

  return (
    <Button className="w-full" type="button" onClick={handleClick}>
      <Plus /> Adicionar ao carrinho
    </Button>
  );
};
