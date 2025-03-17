"use client";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";

import { RenderIf } from "@/components/common/render-if";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenderIfMounted } from "@/components/common/render-if-mounted";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDarkTheme = theme === "dark";
  const isLightTheme = theme === "light";
  const isSystemTheme = theme === "system";

  const themes = [
    { value: "system", label: "Sistema", checked: isSystemTheme },
    { value: "light", label: "Claro", checked: isLightTheme },
    { value: "dark", label: "Escuro", checked: isDarkTheme },
  ];

  return (
    <RenderIfMounted>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <RenderIf when={isSystemTheme}>
              <SunMoon />
            </RenderIf>
            <RenderIf when={isDarkTheme}>
              <MoonIcon />
            </RenderIf>
            <RenderIf when={isLightTheme}>
              <SunIcon />
            </RenderIf>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Aparência</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map(({ checked, label, value }) => (
            <DropdownMenuCheckboxItem
              key={value}
              checked={checked}
              onClick={() => setTheme(value)}
            >
              {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </RenderIfMounted>
  );
};
