"use client";

import { ICategory } from "@/mock/mockCategoryList";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ToDoContext } from "./ToDoContext";
import { AuthContext } from "./AuthContext";
import { Fetcher } from "@/classes/Fetcher";

interface IToDoCategoryContext {
  categoryList: ICategory[];
  selectedCategory: Partial<ICategory> | ICategory | null;
  selectCategory: (category: Partial<ICategory>) => void;
  createCategory: (title: string) => void;
  updateCategory: (id: string, newTitle: string) => void;
  deleteCategory: (id: string) => void;
}

const ToDoCategoryContext = createContext({} as IToDoCategoryContext);

const ToDoCategoryProvider = ({ children }: { children: ReactNode }) => {
  const { deletedCategory } = useContext(ToDoContext);

  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    Partial<ICategory> | ICategory | null
  >(null);

  const { user } = useContext(AuthContext);

  const fetcher = new Fetcher("category");

  useEffect(() => {
    if (user) {
      const getData = async () => {
        const data = (await new Fetcher("category").get()) as ICategory[];
        setCategoryList(data);
      };
      getData();
    }
  }, [user]);

  const selectCategory = (category: Partial<ICategory>) => {
    setSelectedCategory(category);
  };

  const createCategory = async (title: string) => {
    const createdCategory = await fetcher.post<Partial<ICategory>, ICategory>({
      title,
    });

    if (createdCategory) setCategoryList([...categoryList, createdCategory]);
  };
  const updateCategory = async (id: string, title: string) => {
    const renamedCategory = await fetcher.patch<Partial<ICategory>, ICategory>(
      { title },
      {
        id,
      }
    );

    if (renamedCategory)
      setCategoryList(
        categoryList.map((category) =>
          category.id === id ? renamedCategory : category
        )
      );
  };
  const deleteCategory = async (id: string) => {
    const deletedCategoryFetch = await fetcher.delete({ id });

    if (deletedCategoryFetch) {
      setCategoryList(categoryList.filter((category) => category.id !== id));
      deletedCategory(id);
    }
  };

  return (
    <ToDoCategoryContext.Provider
      value={{
        categoryList,
        selectCategory,
        selectedCategory,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </ToDoCategoryContext.Provider>
  );
};

export { ToDoCategoryContext, ToDoCategoryProvider };
