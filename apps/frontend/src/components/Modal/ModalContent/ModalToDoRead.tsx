"use client";

import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import ModalFooter from "../ModalFooter";
import { ModalContext } from "@/context/ModalContext";
import Button from "@/components/Button/Button";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ToDoCategoryContext } from "@/context/ToDoCategoryContext";

export default function ModalToDoRead() {
  const { selectedTask } = useContext(ToDoContext);
  const { toggleModal, changeModalData } = useContext(ModalContext);
  const { categoryList } = useContext(ToDoCategoryContext);
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
          <h3 className="font-bold">Prioridade:</h3>
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
        <hr />
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
        <hr />
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Data de Criação:</h3>
          <div className="w-fit p-1 border rounded-lg font-medium border-woodsmoke-200">
            <p>
              {selectedTask!.creationDate.getDate()} /{" "}
              {(selectedTask!.creationDate.getMonth() + 1)
                .toString()
                .padStart(2, "0")}{" "}
              / {selectedTask!.creationDate.getFullYear()}
            </p>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center text-woodsmoke-950">
          <h3 className="font-bold">Categoria:</h3>
          <p className="p-1 border rounded-lg border-woodsmoke-200">
            {categoryList.find((category) => {
              return category.id === selectedTask?.category;
            })?.title ?? (
              <span className="italic text-woodsmoke-950/50">
                Nenhuma Categoria
              </span>
            )}
          </p>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Ações:</h3>
          <div className="flex gap-x-4">
            <Button
              label="Editar Tarefa"
              ariaLabel="Editar Tarefa"
              extraStyles={{
                button:
                  "w-fit px-4 gap-x-2 bg-crud-update-light text-woodsmoke-50 font-bold",
                label: "hidden lg:inline",
              }}
              action={() => {
                changeModalData({
                  content: "toDoUpdate",
                  type: "update",
                  headerTitle: "Editar Tarefa",
                });
              }}
            >
              <AiFillEdit />
            </Button>
            <Button
              label="Deletar Tarefa"
              ariaLabel="Deletar Tarefa"
              extraStyles={{
                button:
                  "w-fit px-4 gap-x-2 bg-crud-delete-light text-woodsmoke-50 font-bold",
                label: "hidden lg:inline",
              }}
              action={() => {
                changeModalData({
                  content: "toDoRemoveSingle",
                  type: "delete",
                  headerTitle: "Deletar Tarefa",
                });
              }}
            >
              <AiFillDelete />
            </Button>
          </div>
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
