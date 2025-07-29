import { create } from "zustand";

interface Menu {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const useMenu = create<Menu>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false })
}));
