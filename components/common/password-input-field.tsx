"use client";
import { ComponentProps, MouseEvent, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

import { cn } from "@/lib/utils";
import { InputField, InputFieldProps } from "@/components/common/input-field";
import { Render } from "@/components/common/render";
import { Button } from "@/components/ui/button";

export type PasswordInputFieldProps = InputFieldProps &
  Pick<InputFieldProps, "label" | "labelProps" | "isError" | "errorMessage"> & {
    controlled?: {
      state: boolean;
      onClick: () => void;
    };
    buttonProps?: Omit<ComponentProps<typeof Button>, "children" | "onClick">;
  };

export const PasswordInputField = ({
  buttonProps,
  className,
  controlled,
  label,
  isError,
  ...props
}: PasswordInputFieldProps) => {
  const [isHiddenState, setIsHiddenState] = useState(true);
  const toggle = () => {
    setIsHiddenState((prevState) => !prevState);
  };
  const handleClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    if (controlled) {
      controlled?.onClick?.();
      return;
    }

    toggle();
  };

  const isHidden = controlled ? controlled.state : isHiddenState;

  const type = isHidden ? "password" : "text";
  const buttonVariant = buttonProps?.variant ?? "link";
  const buttonClassName = cn(
    `absolute top-${label ? "[18px]" : 0} right-0`,
    buttonProps?.className,
    { "text-destructive": isError }
  );
  return (
    <InputField
      className={cn("pr-12", className)}
      label={label}
      type={type}
      isError={isError}
      {...props}
      bottomChildren={
        <Button
          {...{
            ...buttonProps,
            variant: buttonVariant,
            className: buttonClassName,
          }}
          onClick={handleClick}
        >
          <Render when={isHidden} fallback={<Eye />}>
            <EyeClosed />
          </Render>
        </Button>
      }
    />
  );
};
