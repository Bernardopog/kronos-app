"use client";

import { ModalContext } from "@/context/ModalContext";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";

export default function ModalToDoRemove() {
  const { toggleModal } = useContext(ModalContext);
  const { removeTask } = useContext(ToDoContext);

  const [removalType, setRemovalType] = useState<string>("");

  return (
    <>
      <div className="flex flex-col py-4 px-2 gap-4 text-woodsmoke-950 dark:text-woodsmoke-100">
        <p className="text-center">Qual tipo de tarefa você deseja apagar?</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className={`
              flex-1 rounded-full bg-woodsmoke-100 text-woodsmoke-950 dark:bg-woodsmoke-800 dark:text-woodsmoke-100
              ${removalType === "completed" && "font-bold border-2 border-woodsmoke-950 bg-woodsmoke-200 dark:border-woodsmoke-100 dark:bg-woodsmoke-900 dark:text-woodsmoke-50"}
              `}
            onClick={() => {
              setRemovalType("completed");
            }}
          >
            Tarefas Completas
          </button>
          <button
            className={`
              flex-1 rounded-full bg-woodsmoke-100 text-woodsmoke-950 dark:bg-woodsmoke-800 dark:text-woodsmoke-100
              ${removalType === "uncompleted" && "font-bold border-2 border-woodsmoke-950 bg-woodsmoke-200 dark:border-woodsmoke-100 dark:bg-woodsmoke-900 dark:text-woodsmoke-50"}
              `}
            onClick={() => {
              setRemovalType("uncompleted");
            }}
          >
            Tarefas Incompletas
          </button>
          <button
            className={`
              flex-1 rounded-full bg-woodsmoke-100 text-woodsmoke-950 dark:bg-woodsmoke-800 dark:text-woodsmoke-100
              ${removalType === "all" && "font-bold border-2 border-woodsmoke-950 bg-woodsmoke-200 dark:border-woodsmoke-100 dark:bg-woodsmoke-900 dark:text-woodsmoke-50"}
              `}
            onClick={() => {
              setRemovalType("all");
            }}
          >
            Todas Tarefas
          </button>
        </div>
        <p className="text-center">
          Cuidado, essa ação é{" "}
          <span className="inline-block px-2 rounded-full font-bold text-poppy-600 bg-woodsmoke-100 dark:bg-woodsmoke-950">
            irreversível !
          </span>
        </p>
      </div>
      <ModalFooter
        type={"delete"}
        action={() => {
          toggleModal(null);
          removeTask(removalType);
        }}
      />
    </>
  );
}
