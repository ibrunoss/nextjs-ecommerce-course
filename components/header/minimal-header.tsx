import { CoreHeader } from "@/components/header/core-header";
import { Logo } from "@/components/header/logo";
import { ModeToggle } from "@/components/header/menu/mode-toggle";

export const MinimalHeader = () => {
  return (
    <CoreHeader wrapperProps={{ className: "flex-center relative" }}>
      <Logo />
      <div className="absolute right-5 md:right-10 flex-center">
        <ModeToggle />
      </div>
    </CoreHeader>
  );
};
