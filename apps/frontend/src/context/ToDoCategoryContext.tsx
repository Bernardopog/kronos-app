"use client";

import { ICategory, mockCategoryList } from "@/mock/mockCategoryList";
import IdGenerator from "@/utils/IdGenerator";
import { createContext, ReactNode, useContext, useState } from "react";
import { ToDoContext } from "./ToDoContext";

interface IToDoCategoryContext {
  categoryList: ICategory[];
  selectedCategory: ICategory | null;
  selectCategory: (category: ICategory) => void;
  createCategory: (title: string) => void;
  updateCategory: (id: string, newTitle: string) => void;
  deleteCategory: (id: string) => void;
}

const ToDoCategoryContext = createContext({} as IToDoCategoryContext);

const ToDoCategoryProvider = ({ children }: { children: ReactNode }) => {
  const { deletedCategory } = useContext(ToDoContext);

  const [categoryList, setCategoryList] =
    useState<ICategory[]>(mockCategoryList);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const selectCategory = (category: ICategory) => {
    setSelectedCategory(category);
  };

  const createCategory = (title: string) => {
    setCategoryList([...categoryList, { id: new IdGenerator(8).id, title }]);
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
