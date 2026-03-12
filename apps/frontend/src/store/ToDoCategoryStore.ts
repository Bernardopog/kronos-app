import { Fetcher } from "@/classes/Fetcher";
import { ICategory } from "@/mock/mockCategoryList";
import { create } from "zustand";

interface ICategoryData {
  list: ICategory[];
  fetched: boolean;
  error?: boolean;
}

interface IToDoCategoryStore {
  categoryData: ICategoryData;
  selectedCategory: Partial<ICategory> | ICategory | null;

  getCategories: () => void;
  selectCategory: (category: Partial<ICategory>) => void;
  createCategory: (title: string) => void;
  updateCategory: (id: string, newTitle: string) => void;
  deleteCategory: (id: string) => void;
}

const fetcher = new Fetcher("category");

export const useToDoCategoryStore = create<IToDoCategoryStore>((set, get) => ({
  categoryData: { list: [], fetched: false },
  selectedCategory: null,

  getCategories: async () => {
    if (get().categoryData.fetched) return;
    const res = await fetcher.get<ICategory[]>();

    if (!res) {
      set({ categoryData: { list: [], fetched: true, error: true } });
      return;
    }
    set({ categoryData: { list: res, fetched: true, error: false } });
  },

  selectCategory: (category) => set({ selectedCategory: category }),

  createCategory: async (title) => {
    const createdCategory = await fetcher.post<Partial<ICategory>, ICategory>({
      title,
    });
    if (createdCategory) {
      set({
        categoryData: {
          ...get().categoryData,
          list: [...get().categoryData.list, createdCategory],
        },
      });
    }
  },

  updateCategory: async (id, newTitle) => {
    const updatedCategory = await fetcher.patch<Partial<ICategory>, ICategory>(
      {
        title: newTitle,
      },
      { id },
    );
    if (updatedCategory) {
      set({
        categoryData: {
          ...get().categoryData,
          list: get().categoryData.list.map((category) =>
            category.id === id ? { ...category, title: newTitle } : category,
          ),
        },
      });
    }
  },

  deleteCategory: async (id) => {
    const deletedCategory = await fetcher.delete({ id });

    if (!deletedCategory) return;

    if (deletedCategory) {
      set({
        categoryData: {
          ...get().categoryData,
          list: get().categoryData.list.filter(
            (category) => category.id !== id,
          ),
        },
      });
    }
  },
}));
