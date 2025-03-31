import { ComponentProps, ReactNode } from "react";

import { Render } from "@/components/common/render";
import { cn } from "@/lib/utils";

export type DisplayErrorMessageProps = Omit<
  ComponentProps<"div">,
  "children"
> & {
  error: boolean;
  message: ReactNode;
  align?: "left" | "center" | "right";
};

export const DisplayErrorMessage = ({
  align = "center",
  className,
  error,
  message,
  ...props
}: DisplayErrorMessageProps) => {
  return (
    <Render when={error}>
      <div
        className={cn(`text-${align} text-destructive`, className)}
        {...props}
      >
        {message}
      </div>
    </Render>
  );
};
