"use client";

import { ICategory, mockCategoryList } from "@/mock/mockCategoryList";
import IdGenerator from "@/utils/IdGenerator";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ToDoContext } from "./ToDoContext";
import { AuthContext } from "./AuthContext";

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

  const [categoryList, setCategoryList] =
    useState<ICategory[]>(mockCategoryList);
  const [selectedCategory, setSelectedCategory] = useState<
    Partial<ICategory> | ICategory | null
  >(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setCategoryList((prev) =>
        prev.filter((category) => category.userId === user.id)
      );
    } else {
      setCategoryList(mockCategoryList);
    }
  }, [user]);

  const selectCategory = (category: Partial<ICategory>) => {
    setSelectedCategory(category);
  };

  const createCategory = (title: string) => {
    const newCategory: ICategory = {
      id: new IdGenerator(8).id,
      title,
      userId: user?.id ?? "",
    };

    mockCategoryList.push(newCategory);

    setCategoryList([...categoryList, newCategory]);
  };
  const updateCategory = (id: string, newTitle: string) => {
    const targetCategory = categoryList.find((category) => category.id === id);

    if (!targetCategory) return;

    const updatedCategory: ICategory = {
      ...targetCategory,
      title: newTitle,
    };

    setCategoryList(
      categoryList.map((category) =>
        category.id === id ? updatedCategory : category
      )
    );
  };
  const deleteCategory = (id: string) => {
    setCategoryList(categoryList.filter((category) => category.id !== id));
    deletedCategory(id);
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
