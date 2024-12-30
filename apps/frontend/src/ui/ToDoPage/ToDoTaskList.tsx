"use client";
import ToDoTask from "@/components/ToDoPage/ToDoTask/ToDoTask";
import { ToDoContext } from "@/context/ToDoContext";
import React, { useContext } from "react";

export default function ToDoTaskList() {
  const { toDoTaskList } = useContext(ToDoContext);

  return (
    <ul
      className="flex flex-col items-center h-full w-full px-1 gap-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-600"
      id="td-task-list"
    >
      {toDoTaskList.map((task, idx) => (
        <ToDoTask
          key={task.id}
          taskData={task}
          animationDelay={125 * (idx + 1)}
        />
      ))}
    </ul>
  );
}
