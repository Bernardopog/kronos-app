"use client";

import Button from "../Button/Button";
import { AiFillPlusCircle, AiFillSetting } from "react-icons/ai";
import { DragEvent, useContext, useState } from "react";
import { KanbanContext } from "@/context/KanbanContext";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import KanbanTask from "./KanbanTask";
import { ModalContext } from "@/context/ModalContext";
import KanbanColumnOption from "./KanbanColumnOption";
import { icons } from "@/icons/icons";

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
  const { taskList, updateColumn } = useContext(KanbanContext);

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const [isEditingColumnTitle, setEditingIsColumnTitle] =
    useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>(column.columnName);

  const handleDragOver = (ev: DragEvent<HTMLElement>) => {
    ev.preventDefault();
  };

  const colorHeader = `hsla(${column.color?.[0]}, ${column.color?.[1]}%, ${column.color?.[2]}%, 0.75)`;
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
      className={`min-w-80 max-w-80 rounded-lg border border-woodsmoke-200 overflow-clip duration-300 ease-in-out
      dark:border-woodsmoke-800
      hover:shadow-btn hover:shadow-woodsmoke-800/25
      ${isDragOver && "shadow-btn shadow-woodsmoke-800/50"}
    `}
    >
      <header
        style={{ backgroundColor: `${colorHeader}` }}
        className="flex items-center justify-between h-12 px-4 bg-woodsmoke-100 ease-in-out duration-300
        dark:bg-woodsmoke-950
        "
      >
        <div className="flex items-center gap-x-2">
          {column.icon && (
            <span
              className={`text-2xl
            ${(column.color?.[2] ?? 0) > 60 ? "text-woodsmoke-950 dark:text-woodsmoke-950" : "text-woodsmoke-50 dark:text-woodsmoke-50"}`}
            >
              {icons[column.icon as keyof typeof icons]}
            </span>
          )}
          {isEditingColumnTitle ? (
            <h2
              className="text-xl font-medium text-woodsmoke-800 cursor-pointer
          dark:text-woodsmoke-200 ease-in-out duration-300
          "
              onClick={() => setEditingIsColumnTitle(true)}
            >
              {column?.columnName}
            </h2>
          ) : (
            <input
              type="text"
              value={columnName}
              className={`w-[60%] font-bold text-2xl bg-transparent ease-in-out duration-300 truncate
                ${(column.color?.[2] ?? 0) > 60 ? "text-woodsmoke-950 dark:text-woodsmoke-950" : "text-woodsmoke-50 dark:text-woodsmoke-50"}
              `}
              onChange={(ev) => setColumnName(ev.target.value)}
              onBlur={() => {
                updateColumn(column.id, { ...column, columnName: columnName });
                setEditingIsColumnTitle(false);
              }}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  updateColumn(column.id, {
                    ...column,
                    columnName: columnName,
                  });
                  setEditingIsColumnTitle(false);
                }
              }}
            />
          )}
        </div>
        <Button
          action={() => setIsOptionsOpen(!isOptionsOpen)}
          ariaLabel="Configurações da Coluna"
          icon={<AiFillSetting />}
          extraStyles={{
            button: `
              border rounded-full bg-woodsmoke-100 text-woodsmoke-900
              hover:text-woodsmoke-925
              dark:text-woodsmoke-200 dark:bg-woodsmoke-925
              dark:hover:shadow-btn dark:hover:shadow-woodsmoke-100/25 dark:hover:text-woodsmoke-100
          `,
          }}
        />
      </header>
      <KanbanColumnOption column={column} isOptionsOpen={isOptionsOpen} />
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
      </section>
    </article>
  );
}
