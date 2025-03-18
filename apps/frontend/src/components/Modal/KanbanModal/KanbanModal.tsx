"use client";

import Button from "@/components/Button/Button";
import Inert from "@/components/Inert/Inert";
import { KanbanContext } from "@/context/KanbanContext";
import { icons } from "@/icons/icons";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import { TaskPriorityType } from "@/mock/kanban/mockKanbanTasks";
import { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineSwap } from "react-icons/ai";

export default function KanbanModal() {
  const { selectedKanbanTask, toggleTaskModal, columnList } =
    useContext(KanbanContext);

  const [newTaskName, setNewTaskName] = useState<string>(
    selectedKanbanTask?.taskName ?? ""
  );

  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriorityType>(
    selectedKanbanTask?.priority ?? "low"
  );
  const [newColumn, setNewColumn] = useState<IColumn | null>(null);

  const [isColumnOptionsOpen, setIsColumnOptionsOpen] =
    useState<boolean>(false);

  const column = columnList.find((column) =>
    column.tasksId.includes(selectedKanbanTask?.id ?? "")
  );

  return (
    <form>
      <Button
        action={() => toggleTaskModal()}
        icon={<AiOutlineClose />}
        ariaLabel="Fechar"
      />
      {selectedKanbanTask && column && (
        <>
          <h2 className="font-bold text-2xl">{newTaskName}</h2>
          <div className="flex items-center w-full gap-x-2">
            <p className="flex items-center gap-x-4 font-medium text-xl">
              Coluna:
              <span
                style={{
                  backgroundColor: `hsla(${column.color[0]}, ${column.color[1]}%, ${column.color[2]}%, 0.5)`,
                }}
                className="flex items-center px-2 rounded-lg gap-x-2 font-bold"
              >
                {column.icon && (
                  <span>{icons[column.icon as keyof typeof icons]}</span>
                )}
                <span>{column.columnName}</span>
              </span>
            </p>
            <Button
              extraStyles={{ button: `bg-woodsmoke-950` }}
              ariaLabel="Trocar coluna"
              action={() => setIsColumnOptionsOpen(!isColumnOptionsOpen)}
              icon={<AiOutlineSwap />}
            />
            {newColumn && (
              <span
                style={{
                  backgroundColor: `hsla(${newColumn.color[0]}, ${newColumn.color[1]}%, ${newColumn.color[2]}%, 0.5)`,
                }}
                className="flex items-center px-2 rounded-lg gap-x-2 font-bold text-xl"
              >
                {newColumn.icon && (
                  <span>{icons[newColumn.icon as keyof typeof icons]}</span>
                )}
                <span>{newColumn.columnName}</span>
              </span>
            )}
          </div>
          <Inert
            value={isColumnOptionsOpen}
            style={`w-1/2 mt-2 rounded-lg border-woodsmoke-800 duration-300 ease-in-out overflow-clip
              ${isColumnOptionsOpen ? "p-1 border" : "h-0 mt-0 p-0 gap-0 border-none"}  
          `}
          >
            <ul className="grid grid-cols-4 gap-1">
              {columnList.map((column) => (
                <li key={column.id}>
                  <Button
                    extraStyles={{
                      button: `bg-woodsmoke-950 w-full
                        dark:hover:shadow-btn dark:hover:shadow-woodsmoke-100/25
                      `,
                      label: "truncate",
                    }}
                    icon={icons[column.icon as keyof typeof icons]}
                    label={column.columnName}
                    action={() => {
                      setNewColumn(column);
                      setIsColumnOptionsOpen(false);
                    }}
                  />
                </li>
              ))}
            </ul>
          </Inert>
          <p>Prioridade: {newTaskPriority}</p>
        </>
      )}
    </form>
  );
}
