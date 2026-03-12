import { Fetcher } from "@/classes/Fetcher";
import { IToDoTask } from "@/mock/mockToDoList";
import _ from "lodash";
import { create } from "zustand";

interface IToDoRecentList {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface IToDoData {
  list: IToDoTask[];
  fetched: boolean;
  error?: boolean;
}

type ManyTasksOptions = "all" | "completed" | "uncompleted";

interface IToDoStore {
  toDoData: IToDoData;
  selectedTask: IToDoTask | null;
  recentList: IToDoRecentList[];

  getToDos: () => void;
  selectTask: (task: IToDoTask) => void;
  createTask: (taskData: Partial<IToDoTask>) => void;
  updateTask: (updatedData: Partial<IToDoTask>) => void;
  deleteSpecificTask: (id: string) => void;
  deleteManyTasks: (type: ManyTasksOptions) => void;
  toggleTaskCompletion: (id: string) => void;
}

const fetcher = new Fetcher("todo");

const debouncedToggleRequest = _.debounce(async (id) => {
  const updatedTask = await fetcher.patch<{ id: string }, IToDoTask>({ id });
  if (!updatedTask) return;
}, 500);

export const useToDoStore = create<IToDoStore>((set, get) => ({
  toDoData: { list: [], fetched: false },
  selectedTask: null,
  recentList: [],

  getToDos: async () => {
    if (get().toDoData.fetched) return;
    const res = await fetcher.get<IToDoTask[]>();

    if (!res) {
      set({ toDoData: { list: [], fetched: true, error: true } });
      return;
    }

    const list = res.map((task) => ({
      ...task,
      creationDate: new Date(task.creationDate),
    }));

    set({ toDoData: { list, fetched: true, error: false } });
  },

  selectTask: (task) => set({ selectedTask: task }),
  createTask: async (taskData) => {
    const createdTask = await fetcher.post<Partial<IToDoTask>, IToDoTask>(
      taskData,
    );

    if (!createdTask) return;

    set({
      toDoData: {
        ...get().toDoData,
        list: [
          ...get().toDoData.list,
          { ...createdTask, creationDate: new Date(createdTask.creationDate) },
        ],
      },
      selectedTask: null,
      recentList: [...get().recentList, createdTask],
    });
  },
  updateTask: async (taskData) => {
    const updatedTask = await fetcher.put<Partial<IToDoTask>, IToDoTask>(
      taskData,
      { id: get().selectedTask!.id },
    );

    if (!updatedTask) return;

    set({
      toDoData: {
        ...get().toDoData,
        list: get().toDoData.list.map((task) =>
          task.id === get().selectedTask!.id
            ? {
                ...updatedTask,
                creationDate: new Date(updatedTask.creationDate),
              }
            : task,
        ),
      },
      selectedTask: null,
    });
  },
  deleteSpecificTask: async (id) => {
    const deletedTask = await fetcher.delete({ id });

    if (!deletedTask) return;

    set({
      toDoData: {
        ...get().toDoData,
        list: get().toDoData.list.filter((task) => task.id !== id),
      },
      selectedTask: null,
    });
  },
  deleteManyTasks: async (type) => {
    const deletedManyTasks = await fetcher.delete({
      query: { key: "target", value: type },
    });

    if (!deletedManyTasks) return;

    if (type === "all") {
      set({ toDoData: { list: [], fetched: true, error: false } });
    } else {
      set({
        toDoData: {
          ...get().toDoData,
          list: get().toDoData.list.filter(
            (task) => task.isCompleted === !(type === "completed"),
          ),
        },
      });
    }
  },

  toggleTaskCompletion: async (id) => {
    set({
      toDoData: {
        ...get().toDoData,
        list: get().toDoData.list.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
        ),
      },
    });

    debouncedToggleRequest(id);
  },
}));
