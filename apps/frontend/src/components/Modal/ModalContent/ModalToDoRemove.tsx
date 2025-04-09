"use client";

import { ModalContext } from "@/context/ModalContext";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";
import Button from "@/components/Button/Button";

export default function ModalToDoRemove() {
  const { toggleModal } = useContext(ModalContext);
  const { deleteManyTasks } = useContext(ToDoContext);

  const [removalType, setRemovalType] = useState<
    "all" | "completed" | "uncompleted"
  >("completed");

  return (
    <>
      <div
        className="flex flex-col py-4 px-2 gap-4 text-woodsmoke-950 dark:text-woodsmoke-100"
        aria-live="polite"
      >
        <p className="text-center">Qual tipo de tarefa você deseja apagar?</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            extraStyles={{
              button: `flex-1
              hover:bg-poppy-600
              dark:hover:shadow-btn dark:hover:shadow-poppy-600/25
              ${removalType === "completed" && "font-bold bg-woodsmoke-200 dark:bg-woodsmoke-800"}
              `,
              label:
                "text-base text-woodsmoke-800 dark:text-woodsmoke-200 hover:text-woodsmoke-50",
            }}
            action={() => {
              setRemovalType("completed");
            }}
            label="Tarefas Completas"
          />
          <Button
            extraStyles={{
              button: `flex-1
              hover:bg-poppy-600
              dark:hover:shadow-btn dark:hover:shadow-poppy-600/25
              ${removalType === "uncompleted" && "font-bold bg-woodsmoke-200 dark:bg-woodsmoke-800"}
              `,
              label:
                "text-base text-woodsmoke-800 dark:text-woodsmoke-200 hover:text-woodsmoke-50",
            }}
            action={() => {
              setRemovalType("uncompleted");
            }}
            label="Tarefas Incompletas"
          />
          <Button
            extraStyles={{
              button: `flex-1
              hover:bg-poppy-600
              dark:hover:shadow-btn dark:hover:shadow-poppy-600/25
              ${removalType === "all" && "font-bold bg-woodsmoke-200 dark:bg-woodsmoke-800"}
              `,
              label:
                "text-base text-woodsmoke-800 dark:text-woodsmoke-200 hover:text-woodsmoke-50",
            }}
            action={() => {
              setRemovalType("all");
            }}
            label="Todas Tarefas"
          />
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
          deleteManyTasks(removalType);
        }}
      />
    </>
  );
}
