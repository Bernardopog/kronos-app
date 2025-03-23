"use client";

import { IToDoTask, mockToDoList } from "@/mock/mockToDoList";
import IdGenerator from "@/utils/IdGenerator";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

type FilterStatusType = "all" | "completed" | "uncompleted";
type FilterPriorityType = "all" | "high" | "low";
type FilterCategoryType = "all" | string;

export interface IToDoRecentList {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface IToDoContext {
  toDoTaskList: IToDoTask[];
  selectedTask: IToDoTask | null;
  isFilterShow: boolean;
  isGeneralShow: boolean;
  filterShowControl: boolean;
  generalShowControl: boolean;

  // Filter
  filterStatus: FilterStatusType;
  filterPriority: FilterPriorityType;
  filterCategory: FilterCategoryType;
  changeFilterStatus: (status: FilterStatusType) => void;
  changeFilterPriority: (priority: FilterPriorityType) => void;
  changeFilterCategory: (category: FilterCategoryType) => void;

  toggleFilter: (type: "close" | "open") => void;
  toggleGeneral: (type: "close" | "open") => void;
  toggleTaskCompletion: (taskToToggle: IToDoTask) => void;
  selectTask: (task: IToDoTask) => void;
  createTask: (taskData: Partial<IToDoTask>) => void;
  removeTask: (type: string) => void;
  updateTask: (updatedData: IToDoTask) => void;
  deleteSpecificTask: (id: string) => void;
  recentList: IToDoRecentList[];

  deletedCategory: (id: string) => void;
}

const ToDoContext = createContext({} as IToDoContext);

const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [toDoTaskList, setToDoTaskList] = useState<IToDoTask[]>(mockToDoList);
  const [selectedTask, setSelectedTask] = useState<IToDoTask | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatusType>("all");
  const [filterPriority, setFilterPriority] =
    useState<FilterPriorityType>("all");
  const [filterCategory, setFilterCategory] =
    useState<FilterCategoryType>("all");
  const [isFilterShow, setIsFilterShow] = useState<boolean>(false);
  const [isGeneralShow, setIsGeneralShow] = useState<boolean>(false);

  const [filterShowControl, setFilterShowControl] = useState<boolean>(false);
  const [generalShowControl, setGeneralShowControl] = useState<boolean>(false);

  const [recentList, setRecentList] = useState<IToDoRecentList[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setToDoTaskList((prev) => prev.filter((task) => task.userId === user.id));
    } else {
      setToDoTaskList(mockToDoList);
      setRecentList([]);
    }
  }, [user]);

  const changeFilterStatus = (status: FilterStatusType) => {
    setFilterStatus(status);
  };

  const changeFilterPriority = (priority: FilterPriorityType) => {
    setFilterPriority(priority);
  };

  const changeFilterCategory = (category: FilterCategoryType) => {
    setFilterCategory(category);
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

      category: taskData.category!,
      priority: taskData.priority!,
      description: taskData.description!,
      title: taskData.title!,
      userId: user!.id,
    };

    mockToDoList.push(newTask);

    setToDoTaskList([...toDoTaskList, newTask]);

    if (recentList.length >= 3) {
      setRecentList([...recentList.slice(1), newTask]);
    } else {
      setRecentList([...recentList, newTask]);
    }
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

  /**
   * Updates a task in the to-do list with the given data.
   * @param {IToDoTask} updatedData - The data to update the task with.
   *                                The id property must match the id of an existing task.
   */
  const updateTask = (updatedData: IToDoTask) => {
    const { id, title, description, priority, category } = updatedData;

    const targetTask = toDoTaskList.find((task) => task.id === id);

    if (!targetTask) return;

    const updatedTask: IToDoTask = {
      ...targetTask,
      title,
      description,
      priority,
      category,
    };

    setToDoTaskList(
      toDoTaskList.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  /**
   * Deletes a specific task from the to-do list based on its id.
   * @param {string} id - The id of the task to delete.
   */
  const deleteSpecificTask = (id: string) => {
    setToDoTaskList(toDoTaskList.filter((task) => task.id !== id));
  };

  const deletedCategory = (id: string) => {
    const listRemovedCategoeries = toDoTaskList.map((task) => {
      if (task.category === id) task.category = null;
      return task;
    });
    setToDoTaskList(listRemovedCategoeries);
  };

  return (
    <ToDoContext.Provider
      value={{
        toDoTaskList,
        selectedTask,
        isFilterShow,
        isGeneralShow,
        filterShowControl,
        generalShowControl,
        filterStatus,
        filterPriority,
        filterCategory,
        changeFilterStatus,
        changeFilterPriority,
        changeFilterCategory,
        toggleFilter,
        toggleGeneral,
        toggleTaskCompletion,
        selectTask,
        createTask,
        removeTask,
        updateTask,
        deleteSpecificTask,
        recentList,
        deletedCategory,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export { ToDoContext, ToDoProvider };
