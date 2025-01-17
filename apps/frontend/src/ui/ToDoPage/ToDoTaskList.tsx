"use client";
import ToDoTask from "@/components/ToDoPage/ToDoTask/ToDoTask";
import { ToDoContext } from "@/context/ToDoContext";
import React, { useContext } from "react";

export default function ToDoTaskList() {
  const { toDoTaskList, filterStatus, filterPriority } =
    useContext(ToDoContext);

  return (
    <ul
      className="
        flex flex-col items-center max-h-[calc(100%-7rem)] w-full px-1 pb-4 gap-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-600
        lg:max-h-[calc(100%-7rem)]
      "
      id="td-task-list"
    >
      {toDoTaskList
        .filter((task) => {
          if (filterStatus === "all") return true;
          else if (filterStatus === "completed") return task.isCompleted;
          else return !task.isCompleted;
        })
        .sort((a, b) => {
          if (filterPriority === "all") return 0;
          else if (filterPriority === "high") {
            if (+a.priority > +b.priority) return -1;
            else if (+a.priority < +b.priority) return 1;
            else return 0;
          } else if (filterPriority === "low") {
            if (+a.priority > +b.priority) return 1;
            else if (+a.priority < +b.priority) return -1;
            else return 0;
          } else return 0;
        })
        .map((task, idx) => (
          <ToDoTask
            key={task.id}
            taskData={task}
            animationDelay={50 * (idx + 1)}
          />
        ))}
    </ul>
  );
}
