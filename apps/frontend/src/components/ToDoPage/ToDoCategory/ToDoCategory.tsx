"use client";

import Button from "@/components/Button/Button";
import { ToDoCategoryContext } from "@/context/ToDoCategoryContext";
import { ModalContext } from "@/context/ModalContext";
import { useContext, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

interface IToDoCategoryProps {
  id: string;
  title: string;
}

export default function ToDoCategory({ id, title }: IToDoCategoryProps) {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

  const { toggleModal } = useContext(ModalContext);
  const { selectCategory } = useContext(ToDoCategoryContext);

  return (
    <li
      className="
      flex justify-between items-center relative min-h-8 pl-3 rounded-lg bg-woodsmoke-300 text-woodsmoke-950 font-medium duration-300 ease-in-out
      dark:bg-woodsmoke-900 dark:text-woodsmoke-100
    "
    >
      {isOptionsOpen ? (
        <section className="flex justify-end w-full px-0 gap-x-2">
          <Button
            ariaLabel="Renomear Categoria"
            label="Renomear"
            extraStyles={{
              button:
                "w-fit px-2 gap-x-2 rounded-lg bg-crud-update-light text-woodsmoke-50 shadow-none duration-300 ease-in-out hover:bg-crud-update-dark",
              label: "text-sm",
              icon: "text-lg",
            }}
            action={() => {
              selectCategory({ id, title });
              toggleModal({
                headerTitle: `Renomear Categoria - ${title}`,
                type: "update",
                content: "toDoUpdateCategory",
              });
              setIsOptionsOpen(false);
            }}
          >
            <AiFillEdit />
          </Button>
          <Button
            ariaLabel="Deletar Categoria"
            label="Deletar"
            extraStyles={{
              button:
                "w-fit px-2 gap-x-2 rounded-lg bg-crud-delete-light text-woodsmoke-50 shadow-none duration-300 ease-in-out hover:bg-crud-delete-dark",
              label: "text-sm",
              icon: "text-lg",
            }}
            action={() => {
              selectCategory({ id, title });
              toggleModal({
                headerTitle: `Deletar Categoria - ${title}`,
                type: "delete",
                content: "toDoRemoveCategory",
              });
              setIsOptionsOpen(false);
            }}
          >
            <AiFillDelete />
          </Button>
        </section>
      ) : (
        <span>{title}</span>
      )}
      <button
        className={`
          flex items-center absolute right-0 h-full text-xl text-woodsmoke-50 bg-woodsmoke-900 duration-300 ease-in-out
          dark:bg-woodsmoke-700
          ${isOptionsOpen ? "right-[calc(100%-1.25rem)] rounded-l-lg" : "right-0 rounded-r-lg"}
        `}
        aria-label="Mais opções"
        onClick={() => {
          setIsOptionsOpen(!isOptionsOpen);
        }}
      >
        <IoEllipsisVerticalSharp />
      </button>
    </li>
  );
}
