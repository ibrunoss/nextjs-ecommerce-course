import { ComponentProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { Render } from "@/components/common/render";

export type ButtonFormStatusProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    pendingMessage?: ReactNode;
  };

export const ButtonFormStatus = ({
  pendingMessage,
  children,
  ...props
}: ButtonFormStatusProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} {...props}>
      <Render when={!pending} fallback={pendingMessage}>
        {children}
      </Render>
    </Button>
  );
};
