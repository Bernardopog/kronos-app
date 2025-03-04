"use client";

import Button from "../Button/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { DragEvent, useContext, useState } from "react";
import { KanbanContext } from "@/context/KanbanContext";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import KanbanTask from "./KanbanTask";
import { ModalContext } from "@/context/ModalContext";

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

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (ev: DragEvent<HTMLElement>) => {
    ev.preventDefault();
  };

  return (
    <article
      onDragOver={(ev) => handleDragOver(ev)}
      onDragLeave={() => setIsDragOver(false)}
      onDragEnter={() => setIsDragOver(true)}
      onDrop={(ev) => {
        setIsDragOver(false);
        dragDrop(ev, column.id);
      }}
      className={`min-w-80 max-w-80 rounded-lg border border-woodsmoke-200 overflow-clip duration-300 ease-in-out
      dark:border-woodsmoke-800
      hover:shadow-btn hover:shadow-woodsmoke-800/25
      ${isDragOver && "shadow-btn shadow-woodsmoke-800/50"}
    `}
    >
      <header
        className="flex items-center justify-between h-12 px-4 bg-woodsmoke-100 ease-in-out duration-300
        dark:bg-woodsmoke-950
        "
      >
        <h2
          className="text-xl font-medium text-woodsmoke-800
        dark:text-woodsmoke-200 ease-in-out duration-300
        "
        >
          {column?.columnName}
        </h2>
      </header>
      {index === 0 && (
        <Button
          extraStyles={{
            button: `h-20 w-[calc(100%-1rem)] mx-2 mt-2 border-dashed rounded-lg text-woodsmoke-900
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
      <ul className="flex flex-col gap-2 h-[calc(100%-3rem)] p-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-950">
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
    </article>
  );
}
