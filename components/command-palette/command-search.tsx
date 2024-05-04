import { FC } from "react";
import { ClassNameValue } from "tailwind-merge";

import { useDesktopOnly, useMobileDesktop } from "../hooks";
import { Button } from "../ui/button";

import { useCommandPaletteStore } from "./command-palette-store";

import { cn } from "@/lib";

export interface CommandSearchProps {
  className?: ClassNameValue;
  label?: string;
}

export const CommandSearch: FC<CommandSearchProps> = ({
  className,
  label = "🔍 Search",
}) => {
  const { onOpen } = useCommandPaletteStore();

  return useMobileDesktop(
    <Button
      variant="outline"
      onClick={onOpen}
      className={cn("w-9 h-9", className)}
    >
      {label}
    </Button>,
    <Button
      variant="outline"
      onClick={onOpen}
      className={cn(className, "flex justify-between min gap-2 px-2 text-xs")}
    >
      {label}
      {useDesktopOnly(<CommandKeys />)}
    </Button>
  );
};

export const CommandKeys = () => (
  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
    <span className="text-xs">⌘</span>K
  </kbd>
);
