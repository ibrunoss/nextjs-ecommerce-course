"use client";
import { ReactNode, useEffect, useState } from "react";

import { Render } from "@/components/common/render";

export type RenderIfMountedProps = {
  children: ReactNode;
};

export const RenderIfMounted = ({ children }: RenderIfMountedProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <Render when={mounted}>{children}</Render>;
};
