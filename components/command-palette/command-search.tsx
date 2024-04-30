import { FC } from "react";
import { ClassNameValue } from "tailwind-merge";

import { useMobileDesktop } from "../hooks";
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

  return useMobileDesktop(
    <Input
      placeholder="🔍"
      onClick={onOpen}
      className="w-9 h-9 pl-[10px] pr-0 flex content-center items-center"
    />,
    <div
      className={cn(
        "flex flex-row items-center gap-2 w-full mx-auto",
        className
      )}
    >
      <Input placeholder={label} onClick={onOpen} className="w-[330px]" />
      <Typography effect="tiny">or</Typography>
      <CommandKeys />
    </div>
  );
};

export const CommandKeys = () => (
  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
    <span className="text-xs">⌘</span>K
  </kbd>
);
