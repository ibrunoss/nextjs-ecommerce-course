import { ReactNode } from "react";

export type RenderIfProps = {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
};
export const Render = (props: RenderIfProps) => {
  return props.when ? <>{props.children}</> : <>{props.fallback}</>;
};
