import Image from "next/image";

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Render } from "@/components/common/render";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UserMenuTriggerProps = {
  firstInitial: string;
  srcImage?: string;
};
export const UserMenuTrigger = ({
  firstInitial,
  srcImage = "",
}: UserMenuTriggerProps) => {
  const hasImg = Boolean(srcImage);

  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className={cn(
          "relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200",
          { "p-0": hasImg }
        )}
      >
        <Render when={hasImg} fallback={firstInitial}>
          <Image
            alt="Imagem do perfil do usuário"
            className="object-center object-cover rounded-full"
            src={srcImage}
            width={32}
            height={32}
          />
        </Render>
      </Button>
    </DropdownMenuTrigger>
  );
};
