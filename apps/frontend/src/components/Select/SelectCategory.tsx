import { ToDoCategoryContext } from "@/context/ToDoCategoryContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";

interface ISelectCategoryProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function SelectCategory({
  value,
  setValue,
}: ISelectCategoryProps) {
  const { categoryList } = useContext(ToDoCategoryContext);

  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState<boolean>(false);

  return (
    <div>
      <label
        className="text-woodsmoke-950 dark:text-woodsmoke-300"
        htmlFor="category"
      >
        Categoria:
      </label>
      <button
        aria-haspopup="true"
        aria-expanded={isSelectMenuOpen}
        aria-controls="categoryMenu"
        className="relative w-full p-1 rounded-lg border border-woodsmoke-200 text-woodsmoke-950 dark:text-woodsmoke-50"
        onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)}
      >
        {categoryList.find((category) => category.id === value)?.title ??
          "Escolha uma Categoria"}
        <div className="flex items-center justify-center absolute top-0 right-0 h-full w-8 rounded-r-lg bg-woodsmoke-900">
          <span
            className={`
            block text-3xl  text-woodsmoke-50 duration-300 ease-in-out
            ${isSelectMenuOpen ? "rotate-180" : "rotate-0"}
          `}
          >
            <IoMdArrowDropup />
          </span>
        </div>
      </button>
      {isSelectMenuOpen && (
        <ul
          role="menu"
          aria-labelledby="categoryLabel"
          className="grid grid-cols-3 mt-1 gap-2 animate-move-in opacity-0"
        >
          {categoryList.map((category) => {
            return (
              <li
                className="
                  p-1 rounded-lg border border-woodsmoke-200 cursor-pointer ease-in-out duration-300
                  hover:bg-woodsmoke-200
                  active:bg-woodsmoke-300
                  dark:hover:bg-woodsmoke-800
                "
                key={category.id}
                onClick={() => {
                  setValue(category.id);
                }}
              >
                <button
                  type="button"
                  className="size-full text-woodsmoke-950 dark:text-woodsmoke-200"
                >
                  {category.title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
