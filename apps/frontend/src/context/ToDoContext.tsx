"use client";

import { IToDoTask, mockToDoList } from "@/mock/mockToDoList";
import { createContext, useState } from "react";

interface IToDoContext {
  toDoTaskList: IToDoTask[];
  toggleTaskCompletion: (taskToToggle: IToDoTask) => void;
}

const ToDoContext = createContext({} as IToDoContext);

const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [toDoTaskList, setToDoTaskList] = useState<IToDoTask[]>(mockToDoList);

  /**
   * Toggles the completion status of a specific task.
   * @param {IToDoTask} taskToToggle The task to toggle.
   */
  const toggleTaskCompletion = (taskToToggle: IToDoTask) => {
    const updatedTasks = toDoTaskList.map((task) =>
      task.id === taskToToggle.id
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    );

    setToDoTaskList(updatedTasks);
  };

  return (
    <ToDoContext.Provider
      value={{
        toDoTaskList,
        toggleTaskCompletion,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export { ToDoContext, ToDoProvider };
