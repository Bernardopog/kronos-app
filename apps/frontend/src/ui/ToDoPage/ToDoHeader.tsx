"use client";

import Button from "@/components/Button/Button";
import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export default function ToDoHeader() {
  const { toggleModal } = useContext(ModalContext);

  return (
    <header className="flex justify-center items-center" id="td-header">
      <Button
        label="Criar Tarefa"
        extraStyles={{
          button:
            "w-auto px-2 gap-x-2 bg-apple-600 text-woodsmoke-50 duration-300 ease-in-out hover:bg-apple-700",
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
    </header>
  );
}
