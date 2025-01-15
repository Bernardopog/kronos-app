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
  removeTask: (type: string) => void;
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

  /**
   * Creates a new task and adds it to the to-do task list.
   * @param {Partial<IToDoTask>} taskData - The partial data for the task, including title, description, and priority.
   */

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

  /**
   * Removes tasks from the to-do list based on the specified type.
   * @param {string} type - The type of tasks to remove.
   *                        "all" removes all tasks,
   *                        "completed" removes only completed tasks,
   *                        any other value removes uncompleted tasks.
   */

  const removeTask = (type: string) => {
    if (type === "all") {
      setToDoTaskList(toDoTaskList.filter(() => false));
    } else if (type === "completed") {
      setToDoTaskList(
        toDoTaskList.filter((task) => {
          return !task.isCompleted;
        })
      );
    } else {
      setToDoTaskList(
        toDoTaskList.filter((task) => {
          return task.isCompleted;
        })
      );
    }
  };

  return (
    <ToDoContext.Provider
      value={{
        toDoTaskList,
        selectedTask,
        toggleTaskCompletion,
        selectTask,
        createTask,
        removeTask,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export { ToDoContext, ToDoProvider };
