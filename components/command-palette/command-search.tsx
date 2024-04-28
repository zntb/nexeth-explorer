import { FC } from "react";
import { ClassNameValue } from "tailwind-merge";

import { useDesktopOnly } from "../hooks";
import { Input } from "../ui/input";
import Typography from "../ui/typography";

import { useCommandPalette } from "./command-palette-store";

import { cn } from "@/lib";

export interface CommandSearchProps {
  className?: ClassNameValue;
  label?: string;
}

export const CommandSearch: FC<CommandSearchProps> = ({
  className,
  label = "🔍 Search",
}) => {
  const { onOpen } = useCommandPalette();

  return (
    <div className={cn("flex flex-row items-center gap-2 w-full", className)}>
      <Input placeholder={label} onClick={onOpen} />
      {useDesktopOnly(
        <>
          <Typography effect="tiny">or</Typography>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </>
      )}
    </div>
  );
};
