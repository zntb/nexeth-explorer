import { FC, useEffect } from "react";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
} from "../ui/command";

import { useCommandPaletteStore } from "./command-palette-store";
import { useCommands } from "./use-commands";

export interface CommandPaletteProps {}

export const CommandPalette: FC<CommandPaletteProps> = () => {
  const { isOpen, setIsOpen, onOpen, query, setQuery } =
    useCommandPaletteStore();
  const { navigation, theme, search } = useCommands();

  // Handle cmd + k keyboard event
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpen();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpen]);

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput
        placeholder="Type a command, or search..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {query.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Search Results">{...search}</CommandGroup>
          </>
        )}
        <CommandGroup heading="Navigation">{...navigation}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">{...theme}</CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
