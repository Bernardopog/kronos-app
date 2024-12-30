import { ToDoContext } from "@/context/ToDoContext";
import { IToDoTask } from "@/mock/mockToDoList";
import { useContext } from "react";
import { AiFillCheckCircle, AiFillInfoCircle } from "react-icons/ai";

export default function ToDoTaskActions({ taskData }: { taskData: IToDoTask }) {
  const { toggleTaskCompletion } = useContext(ToDoContext);

  return (
    <div className="flex justify-end items-center w-2/6 gap-x-2">
      <button>
        <div className="flex items-center justify-center size-6 border border-woodsmoke-950 rounded-full text-2xl text-woodsmoke-950">
          <AiFillInfoCircle />
        </div>
      </button>
      <button onClick={() => toggleTaskCompletion(taskData)}>
        <div className="flex items-center justify-center size-6 border border-woodsmoke-950 rounded-full text-2xl text-woodsmoke-950">
          {taskData.isCompleted && <AiFillCheckCircle />}
        </div>
      </button>
    </div>
  );
}
