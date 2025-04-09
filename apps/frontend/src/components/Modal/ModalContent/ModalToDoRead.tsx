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
      <div className="flex flex-col gap-2 p-2 text-woodsmoke-950 dark:text-woodsmoke-300">
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
          <div className="flex flex-col items-center min-w-24 p-1 border rounded-lg font-medium border-woodsmoke-200 dark:border-woodsmoke-800">
            {selectedTask?.priority === "level_0" && "Nenhuma"}
            {selectedTask?.priority === "level_1" && "Muito Baixa"}
            {selectedTask?.priority === "level_2" && "Baixa"}
            {selectedTask?.priority === "level_3" && "Media"}
            {selectedTask?.priority === "level_4" && "Alta"}
            {selectedTask?.priority === "level_5" && "Muito Alta"}

            <div
              className={`
              flex items-center justify-center w-fit px-2 rounded-md font-bold dark:text-woodsmoke-950
              ${selectedTask?.priority === "level_0" && "bg-priority-none"}
              ${selectedTask?.priority === "level_1" && "bg-priority-lowest"}
              ${selectedTask?.priority === "level_2" && "bg-priority-lower"}
              ${selectedTask?.priority === "level_3" && "bg-priority-medium"}
              ${selectedTask?.priority === "level_4" && "bg-priority-higher"}
              ${selectedTask?.priority === "level_5" && "bg-priority-highest"}
            `}
            >
              {selectedTask?.priority.replace("level_", "")}
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h3 className="font-bold">Descrição:</h3>
          <p
            className={`${!selectedTask?.description || selectedTask?.description?.trim() === "" ? "italic text-woodsmoke-950/50 dark:text-woodsmoke-300/50" : ""}`}
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
          <div className="w-fit p-1 border rounded-lg font-medium border-woodsmoke-200 dark:border-woodsmoke-800">
            <p>
              {selectedTask!.creationDate.getDate().toString().padStart(2, "0")}{" "}
              /{" "}
              {(selectedTask!.creationDate.getMonth() + 1)
                .toString()
                .padStart(2, "0")}{" "}
              / {selectedTask!.creationDate.getFullYear()}
            </p>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Categoria:</h3>
          <p className="p-1 border rounded-lg border-woodsmoke-200 dark:border-woodsmoke-800">
            {categoryList.find((category) => {
              return category.id === selectedTask?.categoryId;
            })?.title ?? (
              <span className="italic text-woodsmoke-950/50 dark:text-woodsmoke-300/50">
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
                button: `px-2 font-bold
                  hover:bg-crud-update-dark
                  dark:hover:shadow-btn dark:hover:shadow-crud-update-light/25
                `,
                label: "hidden lg:inline",
              }}
              icon={<AiFillEdit />}
              action={() => {
                changeModalData({
                  content: "toDoUpdate",
                  type: "update",
                  headerTitle: "Editar Tarefa",
                });
              }}
            />
            <Button
              label="Deletar Tarefa"
              ariaLabel="Deletar Tarefa"
              extraStyles={{
                button: `px-2 font-bold
                  hover:bg-crud-delete-dark
                  dark:hover:shadow-btn dark:hover:shadow-crud-delete-light/25
                `,
                label: "hidden lg:inline",
              }}
              action={() => {
                changeModalData({
                  content: "toDoRemoveSingle",
                  type: "delete",
                  headerTitle: "Deletar Tarefa",
                });
              }}
              icon={<AiFillDelete />}
            />
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
