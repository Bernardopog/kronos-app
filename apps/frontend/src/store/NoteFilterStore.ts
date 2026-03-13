import { create } from "zustand";

type FilterFavoriteType = "all" | "favorites" | "notFavorites";
type FilterTagType = "all" | string;

interface IFilter {
  favorite: FilterFavoriteType;
  tag: FilterTagType;
}

interface INoteFilterStore {
  filter: IFilter;
  filterController: (
    type: "favorite" | "tag",
    value: FilterFavoriteType | FilterTagType,
  ) => void;
}

export const useNoteFilterStore = create<INoteFilterStore>((set, get) => ({
  filter: { favorite: "all", tag: "all" },
  filterController: (type, value) =>
    set({ filter: { ...get().filter, [type]: value } }),
}));
