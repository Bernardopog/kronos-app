import { IToDoTask } from "@/mock/mockToDoList";
import ToDoTaskActions from "./ToDoTaskActions";

interface IToDoTaskProps {
  taskData: IToDoTask;
  animationDelay: number;
}

export default function ToDoTask({ taskData, animationDelay }: IToDoTaskProps) {
  return (
    <li
      className={`
        flex justify-between min-w-52 w-full max-w-md border pl-4 pr-2 py-2 rounded-full shadow-base shadow-black/25 animate-move-in opacity-0 ease-in-out duration-300
        ${taskData.isCompleted ? "bg-woodsmoke-100 border-woodsmoke-300 hover:bg-woodsmoke-200 hover:border-woodsmoke-400" : "bg-woodsmoke-50 border-woodsmoke-200 hover:bg-woodsmoke-100 hover:border-woodsmoke-300"}
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <h4
        className={`
          w-4/6
          ${taskData.isCompleted ? "line-through text-woodsmoke-600" : "text-woodsmoke-800"}
        `}
      >
        {taskData.title}
      </h4>
      <ToDoTaskActions taskData={taskData} />
    </li>
  );
}
