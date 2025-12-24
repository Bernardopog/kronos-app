import { IKanbanTask } from "@/mock/kanban/mockKanbanTasks";
import { DragEvent, useContext } from "react";

import { AiOutlineRead } from "react-icons/ai";
import { Button } from "@/ui/Button/";

import { RoleType } from "@/mock/kanban/mockKanbans";
import { KanbanTaskContext } from "@/context/KanbanTaskContext";

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
  const { selectTask, toggleTaskModal } = useContext(KanbanTaskContext);

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
      className={`flex items-center relative min-h-16 rounded-lg border border-woodsmoke-300 bg-woodsmoke-200 overflow-clip ease-in-out duration-300 cursor-grab
      dark:border-woodsmoke-700 dark:bg-woodsmoke-950
      ${task.isCompleted ? "opacity-50 bg-woodsmoke-600 dark:bg-woodsmoke-600" : ""} `}
    >
      <div
        className={` h-1 w-full absolute top-0
        ${priorityColor}
        ${task.isCompleted ? "opacity-0" : ""}
      `}
      />
      <h3
        className={`
          px-2 ease-in-out duration-300 truncate
      dark:text-woodsmoke-200
      ${task.isCompleted ? "text-woodsmoke-100 line-through" : "text-woodsmoke-800"}
      `}
      >
        {task?.taskName}
      </h3>
      {role !== "read" && (
        <Button
          action={() => {
            selectTask(task.id);
            toggleTaskModal();
          }}
          ariaLabel="Visualizar Tarefa"
          extraStyles={{
            button: `absolute right-2
          hover:text-woodsmoke-950
          dark:text-woodsmoke-200
          dark:hover:text-woodsmoke-100 dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-woodsmoke-300/25
          ${task.isCompleted ? "text-woodsmoke-100" : "text-woodsmoke-800"}
          `,
          }}
          icon={<AiOutlineRead />}
        />
      )}
    </li>
  );
}
