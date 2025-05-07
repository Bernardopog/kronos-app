import { IToDoTask } from "@/mock/mockToDoList";
import ToDoTaskActions from "./ToDoTaskActions";

interface IToDoTaskProps {
  taskData: IToDoTask;
  animationDelay: number;
  piority: string;
}

export default function ToDoTask({
  taskData,
  animationDelay,
  piority,
}: IToDoTaskProps) {
  return (
    <li
      className={`
        flex justify-between min-w-52 w-5/6 max-w-md border pl-4 pr-2 py-2 rounded-full shadow-base shadow-black/25 animate-move-in opacity-0 ease-in-out duration-300
        sm:w-full
        ${!taskData.isCompleted && piority === "0" && "hover:border-priority-none hover:bg-linear-to-br from-20% to-200% from-woodsmoke-100 to-priority-none dark:from-woodsmoke-950 dark:to-priority-none"}
        ${!taskData.isCompleted && piority === "1" && "hover:border-priority-lowest hover:bg-linear-to-br from-20% to-200% from-woodsmoke-100 to-priority-lowest dark:from-woodsmoke-950 dark:to-priority-lowest"}
        ${!taskData.isCompleted && piority === "2" && "hover:border-priority-lower hover:bg-linear-to-br from-20% to-200% from-woodsmoke-100 to-priority-lower dark:from-woodsmoke-950 dark:to-priority-lower"}
        ${!taskData.isCompleted && piority === "3" && "hover:border-priority-medium hover:bg-linear-to-br from-20% to-200% from-woodsmoke-100 to-priority-medium dark:from-woodsmoke-950 dark:to-priority-medium"}
        ${!taskData.isCompleted && piority === "4" && "hover:border-priority-higher hover:bg-linear-to-br from-20% to-200% from-woodsmoke-100 to-priority-higher dark:from-woodsmoke-950 dark:to-priority-higher"}
        ${!taskData.isCompleted && piority === "5" && "hover:border-priority-highest hover:bg-linear-to-br from-20% to-200% from-woodsmoke-100 to-priority-highest dark:from-woodsmoke-950 dark:to-priority-highest"}
        ${taskData.isCompleted ? "bg-woodsmoke-100 border-woodsmoke-300 hover:bg-woodsmoke-200 hover:border-woodsmoke-400 dark:bg-woodsmoke-900 dark:border-woodsmoke-600 dark:hover:bg-woodsmoke-900" : "bg-woodsmoke-50 border-woodsmoke-200 hover:bg-woodsmoke-100 hover:border-woodsmoke-300 dark:bg-woodsmoke-950 dark:border-woodsmoke-400 dark:hover:bg-woodsmoke-950"}
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
      <ToDoTaskActions taskData={taskData} />
    </li>
  );
}
