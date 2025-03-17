import { ReactNode } from "react";
import { Logo } from "./logo";

type HeaderProps = {
  children?: ReactNode;
};
export const MainHeader = ({ children }: HeaderProps) => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Logo />
        </div>
        {children}
      </div>
    </header>
  );
};
