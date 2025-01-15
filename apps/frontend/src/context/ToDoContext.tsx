"use client";

import { IToDoTask, mockToDoList } from "@/mock/mockToDoList";
import IdGenerator from "@/mod/IdGenerator";
import { createContext, useState } from "react";

interface IToDoContext {
  toDoTaskList: IToDoTask[];
  selectedTask: IToDoTask | null;
  toggleTaskCompletion: (taskToToggle: IToDoTask) => void;
  selectTask: (task: IToDoTask) => void;
  createTask: (taskData: Partial<IToDoTask>) => void;
}

const ToDoContext = createContext({} as IToDoContext);

const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [toDoTaskList, setToDoTaskList] = useState<IToDoTask[]>(mockToDoList);
  const [selectedTask, setSelectedTask] = useState<IToDoTask | null>(null);

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

  /**
   * Selects a task to be displayed in the modal.
   * @param {IToDoTask} task The task to select.
   */
  const selectTask = (task: IToDoTask) => {
    setSelectedTask(task);
  };

  const createTask = (taskData: Partial<IToDoTask>) => {
    const newTask: IToDoTask = {
      id: new IdGenerator(8).id,
      isCompleted: false,
      creationDate: new Date(),

      category: "",
      priority: taskData.priority!,
      description: taskData.description!,
      title: taskData.title!,
    };

    setToDoTaskList([...toDoTaskList, newTask]);
  };

  return (
    <ToDoContext.Provider
      value={{
        toDoTaskList,
        selectedTask,
        toggleTaskCompletion,
        selectTask,
        createTask,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export { ToDoContext, ToDoProvider };
