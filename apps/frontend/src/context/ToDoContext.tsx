"use client";

import { IToDoTask, mockToDoList } from "@/mock/mockToDoList";
import IdGenerator from "@/mod/IdGenerator";
import { createContext, useState } from "react";

type FilterStatusType = "all" | "completed" | "uncompleted";
type FilterPriorityType = "all" | "high" | "low";

interface IToDoContext {
  toDoTaskList: IToDoTask[];
  selectedTask: IToDoTask | null;
  filterStatus: FilterStatusType;
  filterPriority: FilterPriorityType;
  isFilterShow: boolean;
  isGeneralShow: boolean;
  filterShowControl: boolean;
  generalShowControl: boolean;
  changeFilterStatus: (status: FilterStatusType) => void;
  changeFilterPriority: (priority: FilterPriorityType) => void;
  toggleFilter: (type: "close" | "open") => void;
  toggleGeneral: (type: "close" | "open") => void;
  toggleTaskCompletion: (taskToToggle: IToDoTask) => void;
  selectTask: (task: IToDoTask) => void;
  createTask: (taskData: Partial<IToDoTask>) => void;
  removeTask: (type: string) => void;
}

const ToDoContext = createContext({} as IToDoContext);

const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [toDoTaskList, setToDoTaskList] = useState<IToDoTask[]>(mockToDoList);
  const [selectedTask, setSelectedTask] = useState<IToDoTask | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatusType>("all");
  const [filterPriority, setFilterPriority] =
    useState<FilterPriorityType>("all");
  const [isFilterShow, setIsFilterShow] = useState<boolean>(false);
  const [isGeneralShow, setIsGeneralShow] = useState<boolean>(false);

  const [filterShowControl, setFilterShowControl] = useState<boolean>(false);
  const [generalShowControl, setGeneralShowControl] = useState<boolean>(false);

  const changeFilterStatus = (status: FilterStatusType) => {
    setFilterStatus(status);
  };

  const changeFilterPriority = (priority: FilterPriorityType) => {
    setFilterPriority(priority);
  };

  const toggleFilter = (type: "close" | "open") => {
    if (type === "open") {
      setIsFilterShow(!isFilterShow);
      setTimeout(() => setFilterShowControl(!filterShowControl), 100);
    } else {
      setFilterShowControl(!isFilterShow);
      setTimeout(() => setIsFilterShow(!filterShowControl), 600);
    }
  };
  const toggleGeneral = (type: "close" | "open") => {
    if (type === "open") {
      setIsGeneralShow(!isGeneralShow);
      setTimeout(() => setGeneralShowControl(!generalShowControl), 100);
    } else {
      setGeneralShowControl(!isGeneralShow);
      setTimeout(() => setIsGeneralShow(!generalShowControl), 600);
    }
  };

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
        filterStatus,
        filterPriority,
        isFilterShow,
        isGeneralShow,
        filterShowControl,
        generalShowControl,
        changeFilterStatus,
        changeFilterPriority,
        toggleFilter,
        toggleGeneral,
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
