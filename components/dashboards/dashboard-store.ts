import { create } from "zustand";

export interface DashboardStore {
  category?: string;
  setCategory: (categories: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  category: undefined,
  setCategory: (categories) => set({ category: categories }),
  search: "",
  setSearch: (search) => set({ search }),
}));
