"use client";

import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import ModalFooter from "../ModalFooter";
import { ModalContext } from "@/context/ModalContext";

export default function ModalToDoRead() {
  const { selectedTask } = useContext(ToDoContext);
  const { toggleModal } = useContext(ModalContext);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 text-woodsmoke-950">
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
        <div className="flex justify-between items-center">
          <h3>Prioridade:</h3>
          <div className="flex flex-col items-center min-w-24 p-1 border rounded-lg font-medium border-woodsmoke-200">
            {selectedTask?.priority === "0" && "Nenhuma"}
            {selectedTask?.priority === "1" && "Muito Baixa"}
            {selectedTask?.priority === "2" && "Baixa"}
            {selectedTask?.priority === "3" && "Media"}
            {selectedTask?.priority === "4" && "Alta"}
            {selectedTask?.priority === "5" && "Muito Alta"}

            <div
              className={`
              flex items-center justify-center w-fit px-2 rounded-md font-bold
              ${selectedTask?.priority === "0" && "bg-priority-none"}
              ${selectedTask?.priority === "1" && "bg-priority-lowest"}
              ${selectedTask?.priority === "2" && "bg-priority-lower"}
              ${selectedTask?.priority === "3" && "bg-priority-medium"}
              ${selectedTask?.priority === "4" && "bg-priority-higher"}
              ${selectedTask?.priority === "5" && "bg-priority-highest"}
            `}
            >
              {selectedTask?.priority}
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Descrição:</h3>
          <p
            className={`${!selectedTask?.description || selectedTask?.description?.trim() === "" ? "italic text-woodsmoke-950/50" : ""}`}
          >
            {!selectedTask?.description ||
            selectedTask?.description?.trim() === ""
              ? "Não há descrição..."
              : selectedTask?.description}
          </p>
        </div>
      </div>
      <ModalFooter
        type="read"
        action={() => {
          toggleModal(null);
        }}
      />
    </>
  );
}
