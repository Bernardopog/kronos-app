"use client";

import { ModalContext } from "@/context/ModalContext";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import ModalFooter from "../ModalFooter";

export default function ModalToDoRemoveSingle() {
  const { toggleModal } = useContext(ModalContext);
  const { deleteSpecificTask, selectedTask } = useContext(ToDoContext);

  return (
    <>
      <div className="flex flex-col py-4 px-2 gap-4 text-woodsmoke-950">
        <p className="text-center">
          Você tem certeza que deseja excluir essa tarefa?
        </p>
        <p className="text-center">
          Cuidado, essa ação é{" "}
          <span className="inline-block px-2 rounded-full font-bold text-poppy-600 bg-woodsmoke-100">
            irreversível !
          </span>
        </p>
      </div>
      <ModalFooter
        type={"delete"}
        action={() => {
          toggleModal(null);
          deleteSpecificTask(selectedTask!.id);
        }}
      />
    </>
  );
}
