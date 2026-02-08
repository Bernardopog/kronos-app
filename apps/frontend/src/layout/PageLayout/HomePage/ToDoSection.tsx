"use client";
import ToDoTask from "@/components/ToDoPage/ToDoTask/ToDoTask";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";

export default function ToDoSection() {
  const { toDoTaskList } = useContext(ToDoContext);

  return (
    <ul className="flex flex-col items-center gap-2 scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-woodsmoke-100">
      {toDoTaskList.map((task, index) => (
        <ToDoTask
          key={task.id}
          taskData={task}
          animationDelay={150 * index}
          piority={task.priority.replace("level_", "")}
          readonly
        />
      ))}
    </ul>
  );
}
