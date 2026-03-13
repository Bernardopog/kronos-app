import { create } from "zustand";

export interface INoteListStore {
  isListShowing: boolean;
  listShowControl: boolean;
  toggleList: (type: "open" | "close") => void;
}

export const useNoteListStore = create<INoteListStore>((set) => ({
  isListShowing: false,
  listShowControl: false,
  toggleList: (type) => {
    if (type === "open") {
      set({ isListShowing: true });
      setTimeout(() => set({ listShowControl: true }), 100);
    } else {
      set({ listShowControl: false });
      setTimeout(() => set({ isListShowing: false }), 600);
    }
  },
}));
