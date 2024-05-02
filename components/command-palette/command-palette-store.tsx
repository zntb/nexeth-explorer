import { create } from "zustand";

export interface CommandPaletteStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsOpen: (open: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
}

export const useCommandPaletteStore = create<CommandPaletteStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setIsOpen: (open: boolean) => set({ isOpen: open }),
  query: "",
  setQuery: (query: string) => set({ query }),
}));
