"use client";

import { Button } from "@/ui/Button";
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
              button: `px-2 border-woodsmoke-500 text-woodsmoke-800 shadow-none duration-300 ease-in-out
                dark:border-woodsmoke-500 dark:text-woodsmoke-200
                hover:bg-crud-update-dark
                dark:hover:shadow-btn dark:hover:shadow-crud-update-dark/25`,
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
            icon={<AiFillEdit />}
          />
          <Button
            ariaLabel="Deletar Categoria"
            label="Deletar"
            extraStyles={{
              button: `px-2 border-woodsmoke-500 text-woodsmoke-800 shadow-none duration-300 ease-in-out
                dark:border-woodsmoke-500 dark:text-woodsmoke-200
                hover:bg-crud-delete-dark
                dark:hover:shadow-btn dark:hover:shadow-crud-delete-dark/25`,
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
            icon={<AiFillDelete />}
          />
        </section>
      ) : (
        <span>{title}</span>
      )}
      <Button
        extraStyles={{
          button: `absolute right-0 h-full border-none rounded-none p-0 bg-woodsmoke-900 text-woodsmoke-100
          dark:bg-woodsmoke-700
          ${isOptionsOpen ? "right-[calc(100%-1.25rem)] rounded-l-lg" : "right-0 rounded-r-lg"}
        `,
          label: "text-xl",
        }}
        ariaLabel="Mais opções"
        action={() => {
          setIsOptionsOpen(!isOptionsOpen);
        }}
        icon={<IoEllipsisVerticalSharp />}
      />
    </li>
  );
}
