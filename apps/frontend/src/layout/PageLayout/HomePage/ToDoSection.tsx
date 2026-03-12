"use client";
import ToDoTask from "@/components/ToDoPage/ToDoTask/ToDoTask";
import { useToDoStore } from "@/store/ToDoStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function ToDoSection() {
  const { toDoData, getToDos } = useToDoStore(
    useShallow((s) => ({
      toDoData: s.toDoData,
      getToDos: s.getToDos,
    })),
  );

  const { fetched, list: tasks } = toDoData;

  useEffect(() => {
    if (fetched) return;
    getToDos();
  }, [fetched, getToDos]);

  return (
    <ul className="flex flex-col items-center gap-2 scrollbar-base">
      {tasks.map((task, index) => (
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
