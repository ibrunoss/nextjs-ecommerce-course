"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { toastSuccess } from "@/components/common/toast-success";
import { CART_VIEW_PATH } from "@/lib/constants/routes";
import { ActionState, ActionStateError } from "@/lib/actions/utils.actions";

type Params = {
  skipErrorToast?: boolean;
  skipSuccessToast?: boolean;
};

const defaultParams: Params = {
  skipErrorToast: false,
  skipSuccessToast: false,
};

export const useCartItemToasts = ({
  skipErrorToast,
  skipSuccessToast,
}: Params = defaultParams) => {
  const router = useRouter();

  const showErrorToast = skipErrorToast
    ? undefined
    : (message: ActionState["message"], errors: ActionStateError["errors"]) => {
        toast.error(message.title, {
          richColors: true,
          description: errors.map((e) => e.message.description).join(", "),
        });
      };

  const showSuccessToast = skipSuccessToast
    ? undefined
    : (message: ActionState["message"]) => {
        toastSuccess({
          title: message.title ?? "",
          description: message.description,
          button: {
            label: "Ver carrinho",
            onClick: () => router.push(CART_VIEW_PATH),
          },
        });
      };

  return {
    showErrorToast,
    showSuccessToast,
  };
};
