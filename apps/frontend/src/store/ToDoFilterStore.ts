import { create } from "zustand";

type FilterStatusType = "all" | "completed" | "uncompleted";
type FilterPriorityType = "all" | "high" | "low";
type FilterCategoryType = "all" | string;

interface IFilter {
  status: FilterStatusType;
  priority: FilterPriorityType;
  category: FilterCategoryType;
}

interface IToDoStore {
  filter: IFilter;
  isFilterShowing: boolean;
  filterShowControl: boolean;

  filterController: (
    type: "status" | "priority" | "category",
    value: FilterStatusType | FilterPriorityType | FilterCategoryType,
  ) => void;

  toggleFilter: (type: "close" | "open") => void;
}

export const useToDoFilterStore = create<IToDoStore>((set, get) => ({
  filter: { status: "all", priority: "all", category: "all" },
  isFilterShowing: false,
  filterShowControl: false,

  filterController: (type, value) =>
    set({ filter: { ...get().filter, [type]: value } }),
  toggleFilter: (type) => {
    if (type === "open") {
      set({ isFilterShowing: true });
      setTimeout(() => set({ filterShowControl: true }), 100);
    } else {
      set({ filterShowControl: false });
      setTimeout(() => set({ isFilterShowing: false }), 600);
    }
  },
}));
