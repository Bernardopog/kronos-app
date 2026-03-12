import { create } from "zustand";

export interface IToDoRecentList {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface IToDoGeneralStore {
  isGeneralShowing: boolean;
  generalShowControl: boolean;
  recentList: IToDoRecentList[];

  toggleGeneral: (type: "close" | "open") => void;
}

export const useToDoGeneralStore = create<IToDoGeneralStore>((set) => ({
  isGeneralShowing: false,
  generalShowControl: false,
  recentList: [],

  toggleGeneral: (type) => {
    if (type === "open") {
      set({ isGeneralShowing: true });
      setTimeout(() => set({ generalShowControl: true }), 100);
    } else {
      set({ generalShowControl: false });
      setTimeout(() => set({ isGeneralShowing: false }), 600);
    }
  },
}));
