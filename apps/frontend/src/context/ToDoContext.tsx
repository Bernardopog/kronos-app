"use client";

import { IToDoTask } from "@/mock/mockToDoList";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Fetcher } from "@/classes/Fetcher";

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
  updateTask: (updatedData: Partial<IToDoTask>) => void;
  deleteSpecificTask: (id: string) => void;
  deleteManyTasks: (type: "all" | "completed" | "uncompleted") => void;
  recentList: IToDoRecentList[];

  deletedCategory: (id: string) => void;
}

const ToDoContext = createContext({} as IToDoContext);

const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [toDoTaskList, setToDoTaskList] = useState<IToDoTask[]>([]);
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

  const fetcher = new Fetcher("todo");

  useEffect(() => {
    if (user) {
      const getData = async () => {
        const data = (await new Fetcher("todo").get()) as IToDoTask[];
        const formattedData = data.map((task) => ({
          ...task,
          creationDate: new Date(task.creationDate),
        }));
        setToDoTaskList(formattedData);
      };
      getData();
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

  const toggleTaskCompletion = async (taskToToggle: IToDoTask) => {
    const toggledTask = await fetcher.patch<IToDoTask, IToDoTask>({
      id: taskToToggle.id,
    });

    if (toggledTask) {
      const updatedTasks = toDoTaskList.map((task) =>
        task.id === taskToToggle.id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );
      setToDoTaskList(updatedTasks);
    }
  };

  const selectTask = (task: IToDoTask) => {
    task.creationDate = new Date(task.creationDate);
    setSelectedTask(task);
  };

  const createTask = async (newTaskData: Partial<IToDoTask>) => {
    const createdTask = await fetcher.post<Partial<IToDoTask>, IToDoTask>(
      newTaskData
    );

    if (!createdTask) return;

    setToDoTaskList([...toDoTaskList, createdTask]);

    if (recentList.length >= 3) {
      setRecentList([...recentList.slice(1), createdTask]);
    } else {
      setRecentList([...recentList, createdTask]);
    }
  };

  const updateTask = async (newTaskData: Partial<IToDoTask>) => {
    const updatedTask = await fetcher.put<Partial<IToDoTask>, IToDoTask>(
      {
        title: newTaskData.title,
        description: newTaskData.description,
        priority: newTaskData.priority,
        categoryId: newTaskData.categoryId ?? null,
      },
      { id: selectedTask!.id }
    );

    if (updatedTask)
      setToDoTaskList(
        toDoTaskList.map((task) =>
          task.id === selectedTask!.id ? updatedTask : task
        )
      );
  };

  const deleteSpecificTask = async (id: string) => {
    const deletedTask = await fetcher.delete({ id });

    if (!deletedTask) return;

    setToDoTaskList(toDoTaskList.filter((task) => task.id !== id));
  };

  const deleteManyTasks = async (
    target: "all" | "completed" | "uncompleted"
  ) => {
    const deletedManyTasks = await fetcher.delete({
      query: { key: "target", value: target },
    });

    if (deletedManyTasks) {
      if (target === "all") {
        setToDoTaskList([]);
      } else {
        setToDoTaskList(
          toDoTaskList.filter(
            (task) => task.isCompleted === !(target === "completed")
          )
        );
      }
    }
  };

  const deletedCategory = (id: string) => {
    const listRemovedCategoeries = toDoTaskList.map((task) => {
      if (task.categoryId === id) task.categoryId = null;
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
        deleteManyTasks,
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
