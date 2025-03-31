import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Input as InputUI } from "@/components/ui/input";
import { Render } from "@/components/common/render";
import { Label, LabelProps } from "@/components/common/label";

export type InputFieldProps = ComponentProps<typeof InputUI> & {
  topChildren?: ReactNode;
  bottomChildren?: ReactNode;
  label?: string;
  labelProps?: Omit<LabelProps, "children">;
  isError?: boolean;
  errorMessage?: string;
};

export const InputField = ({
  bottomChildren,
  className,
  errorMessage,
  id,
  isError,
  label,
  labelProps,
  topChildren,
  ...props
}: InputFieldProps) => {
  const showErrorMessage = Boolean(isError && errorMessage);
  const inputClassNameError = "border border-destructive";
  return (
    <div className="relative">
      <Render when={Boolean(label)}>
        <Label
          {...labelProps}
          htmlFor={id}
          className={cn({ "text-destructive": isError }, labelProps?.className)}
        >
          {label}
        </Label>
      </Render>
      {topChildren}
      <InputUI
        id={id}
        className={cn("pr-12", { [inputClassNameError]: isError }, className)}
        {...props}
      />
      {bottomChildren}
      <Render when={showErrorMessage}>
        <p className="absolute text-xs text-destructive ">{errorMessage}</p>
      </Render>
    </div>
  );
};
