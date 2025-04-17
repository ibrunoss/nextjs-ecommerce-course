"use client";
import React from "react";
import { toast as sonnerToast } from "sonner";

import { Render } from "@/components/common/render";
import { Button } from "@/components/ui/button";

export function toastSuccess(toast: Omit<ToastProps, "id">) {
  let button: ToastProps["button"];

  if (toast.button) {
    button = {
      label: toast.button.label,
      onClick: toast.button.onClick,
    };
  }
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      button={button}
    />
  ));
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: Readonly<ToastProps>) {
  const { title, description, button, id } = props;

  return (
    <div className="flex rounded-lg bg-green-50 shadow-lg ring-1 ring-green-200 w-full md:max-w-[364px] items-center p-4">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium text-green-700">{title}</p>
          <p className="mt-1 text-xs text-green-800">{description}</p>
        </div>
      </div>
      <Render when={button !== undefined}>
        <div className="ml-5 shrink-0 rounded-md text-sm text-green-600 hover:text-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-hidden">
          <Button
            size="sm"
            className="rounded bg-green-700 px-3 py-1 text-green-50 hover:text-green-100  hover:bg-green-800"
            onClick={() => {
              button?.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {button?.label}
          </Button>
        </div>
      </Render>
    </div>
  );
}

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  button?: {
    label: string;
    onClick: () => void;
  };
}
