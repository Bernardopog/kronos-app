"use client";

import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";

export default function ModalToDoRead() {
  const { selectedTask } = useContext(ToDoContext);

  return (
    <div className="flex flex-col gap-2 text-woodsmoke-950">
      <div>
        <h3 className="font-bold">Título:</h3>
        <p className="">{selectedTask?.title}</p>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Completado:</h3>
        {selectedTask?.isCompleted ? (
          <div
            className={`
          py-1 px-4 rounded-lg font-bold bg-crud-create-light text-woodsmoke-50
        `}
          >
            Sim
          </div>
        ) : (
          <div
            className={`
          py-1 px-4 rounded-lg font-bold bg-crud-delete-light text-woodsmoke-50
        `}
          >
            Não
          </div>
        )}
      </div>
      <hr />
      <div>
        <h3 className="font-bold">Descrição:</h3>
        <p
          className={`${selectedTask?.description ? "" : "italic text-woodsmoke-950/50"}`}
        >
          {selectedTask?.description ?? "Não há descrição..."}
        </p>
      </div>
    </div>
  );
}
