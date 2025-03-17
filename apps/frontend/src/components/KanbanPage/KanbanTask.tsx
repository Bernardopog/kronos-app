import { IKanbanTask } from "@/mock/kanban/mockKanbanTasks";
import { DragEvent } from "react";

import { AiOutlineRead } from "react-icons/ai";
import Button from "../Button/Button";

interface IKanbanTaskProps {
  task: IKanbanTask;
  dragStart: (
    ev: DragEvent<HTMLLIElement>,
    itemId: string,
    originalColumnId: string
  ) => void;
  columnId: string;
}

export default function KanbanTask({
  task,
  dragStart,
  columnId,
}: IKanbanTaskProps) {
  return (
    <li
      draggable="true"
      onDragStart={(ev) => dragStart(ev, task.id, columnId)}
      className="flex items-center relative min-h-16 rounded-lg border border-woodsmoke-300 bg-woodsmoke-200 overflow-clip ease-in-out duration-300
      dark:border-woodsmoke-700 dark:bg-woodsmoke-950"
    >
      <h3
        className="px-2 text-woodsmoke-800 ease-in-out duration-300 truncate
      dark:text-woodsmoke-200"
      >
        {task?.taskName}
      </h3>
      <Button
        action={() => {}}
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
    </li>
  );
}
