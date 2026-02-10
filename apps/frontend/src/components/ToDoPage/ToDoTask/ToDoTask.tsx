import { IToDoTask } from "@/mock/mockToDoList";
import ToDoTaskActions from "./ToDoTaskActions";

interface IToDoTaskProps {
  taskData: IToDoTask;
  animationDelay: number;
  piority: string;
  readonly?: boolean;
}

export default function ToDoTask({
  taskData,
  animationDelay,
  piority,
  readonly = false,
}: IToDoTaskProps) {
  const priorityStyles: Record<string, string> = {
    "0": "from-woodsmoke-100 to-priority-none dark:from-woodsmoke-950",
    "1": "from-woodsmoke-100 to-priority-lowest dark:from-woodsmoke-950",
    "2": "from-woodsmoke-100 to-priority-lower dark:from-woodsmoke-950",
    "3": "from-woodsmoke-100 to-priority-medium dark:from-woodsmoke-950",
    "4": "from-woodsmoke-100 to-priority-higher dark:from-woodsmoke-950",
    "5": "from-woodsmoke-100 to-priority-highest dark:from-woodsmoke-950",
  };

  const isCompleted = taskData.isCompleted;
  const priorityColor = priorityStyles[piority];

  const statusClasses = isCompleted
    ? "bg-woodsmoke-100 border-woodsmoke-300 hover:bg-woodsmoke-200 hover:border-woodsmoke-400 dark:bg-woodsmoke-900 dark:border-woodsmoke-600 dark:hover:bg-woodsmoke-900"
    : "bg-woodsmoke-50 border-woodsmoke-200 hover:bg-woodsmoke-100 hover:border-woodsmoke-300 dark:bg-woodsmoke-950 dark:border-woodsmoke-400 dark:hover:bg-woodsmoke-950";

  const priorityHoverClasses =
    !isCompleted && priorityColor
      ? `hover:border-${priorityColor} hover:bg-linear-to-br from-20% to-200% from-woodsmoke-100 ${priorityColor} dark:from-woodsmoke-950`
      : "";

  return (
    <li
      className={`
        flex justify-between min-w-52 w-5/6 max-w-md border pl-4 pr-2 py-2 rounded-full 
        shadow-[0_8px_4px] shadow-black/25 animate-move-in opacity-0 ease-in-out duration-300
        sm:w-full
        ${statusClasses}
        ${priorityHoverClasses}
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <h4
        className={`
          w-4/6 truncate
          ${taskData.isCompleted ? "line-through text-woodsmoke-600 dark:text-woodsmoke-500" : "text-woodsmoke-800 dark:text-woodsmoke-300"}
        `}
      >
        {taskData.title}
      </h4>
      <ToDoTaskActions taskData={taskData} readonly={readonly} />
    </li>
  );
}
