import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { ActionState } from "@/lib/actions/utils.actions";

export function useCredentialsForm(
  actionFn: (
    prevState: ActionState,
    formData: FormData
  ) => Promise<ActionState>,
  initialState: ActionState,
  getErrorMessage: (result: ActionState) => string
) {
  const [data, action] = useActionState(actionFn, initialState);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const errorMessage = getErrorMessage(data);
  const showError = !("success" in data) || data.success === false;

  return { action, callbackUrl, errorMessage, showError, data };
}
