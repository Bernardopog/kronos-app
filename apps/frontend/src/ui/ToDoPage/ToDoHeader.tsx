"use client";

import Button from "@/components/Button/Button";
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
          button:
            "w-auto px-2 gap-x-2 bg-apple-600 text-woodsmoke-50 duration-300 ease-in-out hover:bg-apple-700",
          label: "hidden sm:inline",
        }}
        action={() => {
          toggleModal({
            content: "toDoCreate",
            type: "create",
            headerTitle: "Criar Tarefa",
          });
        }}
      >
        <AiFillPlusCircle />
      </Button>
      <Button
        label="Limpar Tarefas"
        extraStyles={{
          button:
            "w-auto px-2 gap-x-2 bg-poppy-600 text-woodsmoke-50 duration-300 ease-in-out hover:bg-poppy-700",
          label: "hidden sm:inline",
        }}
        action={() => {
          toggleModal({
            content: "toDoRemove",
            type: "delete",
            headerTitle: "Remover Tarefas",
          });
        }}
      >
        <FaBroom />
      </Button>
    </header>
  );
}
