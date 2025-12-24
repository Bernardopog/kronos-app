"use client";

import { Button } from "@/ui/Button";
import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaBroom } from "react-icons/fa";

export default function ToDoHeader() {
  const { toggleModal } = useContext(ModalContext);

  return (
    <header
      className="flex justify-center items-center gap-x-48 sm:gap-x-36"
      id="td-header"
    >
      <Button
        label="Criar Tarefa"
        extraStyles={{
          button: `px-2 text-woodsmoke-900 dark:text-woodsmoke-200
            hover:bg-apple-600 
            hover:border-transparent 
            dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-apple-500/25
            `,
          label: "hidden sm:inline",
        }}
        action={() => {
          toggleModal({
            content: "toDoCreate",
            type: "create",
            headerTitle: "Criar Tarefa",
          });
        }}
        icon={<AiFillPlusCircle />}
      />
      <Button
        label="Limpar Tarefas"
        extraStyles={{
          button: `px-2 text-woodsmoke-900 dark:text-woodsmoke-200
            hover:bg-poppy-600 
            hover:border-transparent 
            dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-poppy-500/25
            `,
          label: "hidden sm:inline",
        }}
        action={() => {
          toggleModal({
            content: "toDoRemove",
            type: "delete",
            headerTitle: "Deletar multiplas Tarefas",
          });
        }}
        icon={<FaBroom />}
      />
    </header>
  );
}
