import { create } from 'zustand';

type BookStore = {
  showNewExpense: boolean;
  setShowNewExpense: (showNewExpense: boolean) => void;
  activeBookId: number | null;
  setActiveBookId: (activeBookId: number | null) => void;
};

export const useBookStore = create<BookStore>((set) => ({
  showNewExpense: true,
  setShowNewExpense: (showNewExpense: boolean) => set({ showNewExpense }),
  activeBookId: null,
  setActiveBookId: (activeBookId: number | null) => set({ activeBookId }),
}));