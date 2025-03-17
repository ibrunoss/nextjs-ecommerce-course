"use client";
import { ReactNode, useEffect, useState } from "react";

import { RenderIf } from "@/components/common/render-if";

export type RenderIfMountedProps = {
  children: ReactNode;
};

export const RenderIfMounted = ({ children }: RenderIfMountedProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <RenderIf when={mounted}>{children}</RenderIf>;
};
