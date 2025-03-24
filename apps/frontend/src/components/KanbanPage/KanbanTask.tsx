import { IKanbanTask } from "@/mock/kanban/mockKanbanTasks";
import { DragEvent, useContext } from "react";

import { AiOutlineRead } from "react-icons/ai";
import Button from "../Button/Button";
import { KanbanContext } from "@/context/KanbanContext";
import { RoleType } from "@/mock/kanban/mockKanbans";

interface IKanbanTaskProps {
  task: IKanbanTask;
  dragStart: (
    ev: DragEvent<HTMLLIElement>,
    itemId: string,
    originalColumnId: string
  ) => void;
  columnId: string;
  role: RoleType | null;
}

export default function KanbanTask({
  task,
  dragStart,
  columnId,
  role,
}: IKanbanTaskProps) {
  const { selectKanbanTask, toggleTaskModal } = useContext(KanbanContext);

  let priorityColor: string = "";

  switch (task.priority) {
    case "low":
      priorityColor = "bg-priority-lowest";
      break;
    case "medium":
      priorityColor = "bg-priority-medium";
      break;
    case "high":
      priorityColor = "bg-priority-highest";
      break;
  }

  return (
    <li
      draggable={role !== "read"}
      onDragStart={(ev) => {
        if (role !== "read") dragStart(ev, task.id, columnId);
      }}
      className="flex items-center relative min-h-16 rounded-lg border border-woodsmoke-300 bg-woodsmoke-200 overflow-clip ease-in-out duration-300
      dark:border-woodsmoke-700 dark:bg-woodsmoke-950"
    >
      <div
        className={` h-1 w-full absolute top-0
        ${priorityColor}
      `}
      />
      <h3
        className="px-2 text-woodsmoke-800 ease-in-out duration-300 truncate
      dark:text-woodsmoke-200"
      >
        {task?.taskName}
      </h3>
      {role !== "read" && (
        <Button
          action={() => {
            selectKanbanTask(task.id);
            toggleTaskModal();
          }}
          ariaLabel="Visualizar Tarefa"
          extraStyles={{
            button: `absolute right-2 text-woodsmoke-800 
          hover:text-woodsmoke-950
          dark:text-woodsmoke-200
          dark:hover:text-woodsmoke-100 dark:hover:shadow-btn dark:hover:shadow-woodsmoke-300/25
          `,
          }}
          icon={<AiOutlineRead />}
        />
      )}
    </li>
  );
}
