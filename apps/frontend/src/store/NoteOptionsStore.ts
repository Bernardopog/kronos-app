import { create } from "zustand";

interface INoteOptionsStore {
  isOptionsShowing: boolean;
  optionsShowControl: boolean;
  toggleOptions: (type: "open" | "close") => void;
}

export const useNoteOptionsStore = create<INoteOptionsStore>()((set) => ({
  isOptionsShowing: false,
  optionsShowControl: false,
  toggleOptions: (type) => {
    if (type === "open") {
      set({ isOptionsShowing: true });
      setTimeout(() => set({ optionsShowControl: true }), 100);
    } else {
      set({ optionsShowControl: false });
      setTimeout(() => set({ isOptionsShowing: false }), 600);
    }
  },
}));
