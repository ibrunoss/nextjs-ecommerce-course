import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type HeaderProps = ComponentProps<"header"> & {
  wrapperProps?: Omit<ComponentProps<"div">, "children">;
};

export const CoreHeader = ({
  children,
  className,
  wrapperProps,
  ...props
}: HeaderProps) => {
  return (
    <header className={cn("w-full border-b", className)} {...props}>
      <div
        {...{
          ...wrapperProps,
          className: cn("wrapper", wrapperProps?.className),
        }}
      >
        {children}
      </div>
    </header>
  );
};
