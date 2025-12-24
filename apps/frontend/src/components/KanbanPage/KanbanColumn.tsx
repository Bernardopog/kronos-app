"use client";

import { Button } from "@/ui/Button/";

import { AiFillPlusCircle } from "react-icons/ai";
import { DragEvent, useContext, useState } from "react";
import KanbanTask from "./KanbanTask";
import { ModalContext } from "@/context/ModalContext";
import KanbanColumnOption from "./KanbanColumnOption";
import KanbanColumnHeader from "./KanbanColumnHeader";
import Inert from "@/ui/Inert";

import { RoleType } from "@/mock/kanban/mockKanbans";
import { IColumnFullKanban } from "@/context/KanbanContext";

interface IKanbanColumnProps {
  column: IColumnFullKanban;
  index: number;
  dragStart: (
    ev: DragEvent<HTMLLIElement>,
    itemId: string,
    originalColumnId: string
  ) => void;
  dragDrop: (ev: DragEvent<HTMLElement>, columnId: string) => void;
  role: RoleType | null;
}

export default function KanbanColumn({
  column,
  index,
  dragStart,
  dragDrop,
  role,
}: IKanbanColumnProps) {
  const { toggleModal } = useContext(ModalContext);

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
      className={`min-w-80 max-w-80 min-h-[460px] h-dvh max-h-[calc(100%-6rem)] rounded-lg border border-woodsmoke-200 overflow-clip duration-300 ease-in-out
      dark:border-woodsmoke-800
      hover:shadow-[0_0_5px_3px] hover:shadow-woodsmoke-800/25
      lg:min-h-[85vh] lg:max-h-[85vh]
      ${isDragOver && "shadow-[0_0_5px_3px] shadow-woodsmoke-800/50"}
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
        role={role}
      />
      {role !== "read" && (
        <Inert
          value={isOptionsOpen}
          style={`relative bg-woodsmoke-200 duration-300 ease-in-out overflow-clip
          dark:bg-woodsmoke-925
          ${isOptionsOpen ? "h-full p-2 lg:blur-0" : "h-0 lg:blur-xs"}
        `}
        >
          <KanbanColumnOption
            column={column}
            setIsOptionsOpen={setIsOptionsOpen}
          />
        </Inert>
      )}
      <section
        style={{ backgroundColor: `${colorBody}` }}
        className={`min-h-[508px] h-[calc(100vh-14rem)] lg:h-full
        ${index === 0 && "pt-2"}
      `}
      >
        {index === 0 && role !== "read" && (
          <Button
            extraStyles={{
              button: `min-h-16 w-[calc(100%-1rem)] mx-2 border-dashed rounded-lg text-woodsmoke-900
                  dark:text-woodsmoke-200
                  hover:bg-apple-600
                  dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-apple-600/25
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
        <ul
          className="flex flex-col gap-2 h-[calc(100vh-12rem)] p-2 overflow-y-auto scrollbar-none
          lg:gap-2
        "
        >
          {column.tasks?.map((task) => (
            <KanbanTask
              key={task.id}
              task={task}
              dragStart={dragStart}
              columnId={column.id}
              role={role}
            />
          ))}
        </ul>
      </section>
    </article>
  );
}
