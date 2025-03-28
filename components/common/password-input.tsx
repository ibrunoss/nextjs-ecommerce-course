"use client";
import { ComponentProps, MouseEvent, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Render } from "@/components/common/render";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FieldProps = ComponentProps<typeof Input> & {
  controlled?: {
    state: boolean;
    onClick: () => void;
  };
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
};

export const PasswordInput = ({
  buttonVariant = "outline",
  className,
  controlled,
  ...props
}: FieldProps) => {
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
  return (
    <div className="relative">
      <Input className={cn("pr-12", className)} {...props} type={type} />
      <Button
        variant={buttonVariant}
        className="absolute top-0 right-0"
        onClick={handleClick}
      >
        <Render when={isHidden} fallback={<Eye />}>
          <EyeClosed />
        </Render>
      </Button>
    </div>
  );
};
