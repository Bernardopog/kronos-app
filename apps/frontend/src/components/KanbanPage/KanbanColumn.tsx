"use client";

import Button from "../Button/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { DragEvent, useContext, useState } from "react";
import { KanbanContext } from "@/context/KanbanContext";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import KanbanTask from "./KanbanTask";
import { ModalContext } from "@/context/ModalContext";
import KanbanColumnOption from "./KanbanColumnOption";
import KanbanColumnHeader from "./KanbanColumnHeader";
import Inert from "../Inert/Inert";

interface IKanbanColumnProps {
  column: IColumn;
  index: number;
  dragStart: (
    ev: DragEvent<HTMLLIElement>,
    itemId: string,
    originalColumnId: string
  ) => void;
  dragDrop: (ev: DragEvent<HTMLElement>, columnId: string) => void;
}

export default function KanbanColumn({
  column,
  index,
  dragStart,
  dragDrop,
}: IKanbanColumnProps) {
  const { toggleModal } = useContext(ModalContext);
  const { taskList } = useContext(KanbanContext);

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const [isEditingColumnTitle, setEditingIsColumnTitle] =
    useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>(column.columnName);

  const handleDragOver = (ev: DragEvent<HTMLElement>) => {
    ev.preventDefault();
  };

  const colorBody = `hsla(${column.color?.[0]}, ${column.color?.[1]}%, ${column.color?.[2]}%, 0.1)`;

  return (
    <article
      onDragOver={(ev) => handleDragOver(ev)}
      onDragLeave={() => setIsDragOver(false)}
      onDragEnter={() => setIsDragOver(true)}
      onDrop={(ev) => {
        setIsDragOver(false);
        dragDrop(ev, column.id);
      }}
      className={`min-w-80 max-w-80 min-h-[85vh] max-h-[85vh] rounded-lg border border-woodsmoke-200 overflow-clip duration-300 ease-in-out
      dark:border-woodsmoke-800
      hover:shadow-btn hover:shadow-woodsmoke-800/25
      ${isDragOver && "shadow-btn shadow-woodsmoke-800/50"}
    `}
    >
      <KanbanColumnHeader
        column={column}
        columnName={columnName}
        setColumnName={setColumnName}
        isOptionsOpen={isOptionsOpen}
        setIsOptionsOpen={setIsOptionsOpen}
        isEditingColumnTitle={isEditingColumnTitle}
        setEditingIsColumnTitle={setEditingIsColumnTitle}
      />
      <Inert
        value={isOptionsOpen}
        style={`relative bg-woodsmoke-200 duration-300 ease-in-out overflow-clip
          dark:bg-woodsmoke-925
          ${isOptionsOpen ? "h-full p-2 blur-0" : "h-0 blur-sm"}
        `}
      >
        <KanbanColumnOption column={column} setIsOptionsOpen={setIsOptionsOpen} />
      </Inert>
      <section
        style={{ backgroundColor: `${colorBody}` }}
        className={`h-full
        ${index === 0 && "pt-2"}
      `}
      >
        {index === 0 && (
          <Button
            extraStyles={{
              button: `h-20 w-[calc(100%-1rem)] mx-2 border-dashed rounded-lg text-woodsmoke-900
                  dark:text-woodsmoke-200
                  hover:bg-apple-600
                  dark:hover:shadow-btn dark:hover:shadow-apple-600/25
                `,
            }}
            action={() =>
              toggleModal({
                content: "kanbanCreateTask",
                type: "create",
                headerTitle: "Criar Tarefa Kanban",
              })
            }
            icon={<AiFillPlusCircle />}
            label="Criar nova Tarefa"
          />
        )}
        <ul className="flex flex-col gap-2 h-[calc(100vh-18rem)] p-2 overflow-y-auto scrollbar-none">
          {taskList
            .filter((task) => column.tasksId.includes(task.id))
            .map((task) => (
              <KanbanTask
                key={task.id}
                task={task}
                dragStart={dragStart}
                columnId={column.id}
              />
            ))}
        </ul>
      </section>
    </article>
  );
}
