import { createContext, ReactNode, useContext, useState } from "react";
import { Fetcher } from "@/classes/Fetcher";
import { TaskPriorityType } from "@/mock/kanban/mockKanbanTasks";
import { ITaskFullKanban, KanbanContext } from "./KanbanContext";

interface CreateTask {
  taskName: string;
  description?: string;
  priority: TaskPriorityType;
}

interface IKanbanTaskContext {
  selectedKanbanTask: ITaskFullKanban | null;
  isTaskModalOpen: boolean;

  toggleTaskModal: () => void;
  selectTask: (taskId: string) => void;
  createTask: (task: CreateTask) => void;
  updateTask: (taskId: string, data: ITaskFullKanban) => void;
  completeTask: (taskId: string) => void;
  moveTaskDragAndDrop: (
    columnId: string,
    itemId: string,
    originalColumnId: string
  ) => void;
  deleteTask: (taskId: string) => void;
}

const KanbanTaskContext = createContext({} as IKanbanTaskContext);

const KanbanTaskProvider = ({ children }: { children: ReactNode }) => {
  const [selectedKanbanTask, setSelectedKanbanTask] =
    useState<ITaskFullKanban | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const { selectedKanban, setSelectedKanban } = useContext(KanbanContext);

  const fetcher = new Fetcher("kanbantask");

  const toggleTaskModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };

  const selectTask = async (taskId: string) => {
    const task = (await fetcher.get({ id: taskId })) as ITaskFullKanban;
    if (task) setSelectedKanbanTask(task);
  };

  const createTask = async ({
    taskName,
    description,
    priority,
  }: CreateTask) => {
    if (!selectedKanban) return;

    const columnId = selectedKanban.columns[0].id;

    const createdTask = await fetcher.post<
      CreateTask & { columnId: string },
      ITaskFullKanban
    >({
      taskName,
      description,
      priority,
      columnId,
    });

    if (createdTask) {
      setSelectedKanban((prev) => {
        if (!prev) return prev;
        const updatedColumns = prev.columns.map((col) =>
          col.id === columnId
            ? { ...col, tasks: [...col.tasks, createdTask] }
            : col
        );
        return { ...prev, columns: updatedColumns };
      });
    }
  };

  const updateTask = async (taskId: string, data: ITaskFullKanban) => {
    const body = {
      taskName: data.taskName,
      description: data.description,
      priority: data.priority,
      completionDate: data.completionDate,
      team: data.team,
      columnId: data.columnId,
    };

    const updatedTask = await fetcher.put<typeof body, ITaskFullKanban>(body, {
      id: taskId,
    });

    if (updatedTask) {
      setSelectedKanban((prev) => {
        if (!prev) return prev;
        const updatedColumns = prev.columns.map((col) => {
          const hasTask = col.tasks.some((t) => t.id === taskId);
          if (col.id === updatedTask.columnId) {
            return {
              ...col,
              tasks: hasTask
                ? col.tasks.map((t) =>
                    t.id === taskId ? (updatedTask as ITaskFullKanban) : t
                  )
                : [...col.tasks, updatedTask],
            };
          }
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== taskId),
          };
        });
        return { ...prev, columns: updatedColumns };
      });
    }
  };

  const completeTask = async (taskId: string) => {
    const updated = await fetcher.patch({ id: taskId, endpoint: "complete" });

    if (updated) {
      setSelectedKanban((prev) => {
        if (!prev) return prev;
        const updatedColumns = prev.columns.map((col) => {
          const tasks = col.tasks ?? [];
          return {
            ...col,
            tasks: tasks.map((task) =>
              task.id === taskId
                ? { ...task, isCompleted: !task.isCompleted }
                : task
            ),
          };
        });
        return { ...prev, columns: updatedColumns };
      });
    }
  };

  const moveTaskDragAndDrop = async (
    columnId: string,
    itemId: string,
    originalColumnId: string
  ) => {
    if (columnId === originalColumnId) return;

    const updated = await fetcher.patch({ columnId }, { id: itemId });

    if (updated) {
      setSelectedKanban((prev) => {
        if (!prev) return prev;

        const updatedColumns = prev.columns.map((col) => {
          const tasks = col.tasks ?? [];
          if (col.id === originalColumnId) {
            return {
              ...col,
              tasks: tasks.filter((task) => task.id !== itemId),
            };
          }
          if (col.id === columnId) {
            return {
              ...col,
              tasks: [...tasks, updated as ITaskFullKanban],
            };
          }
          return col;
        });

        return { ...prev, columns: updatedColumns };
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    const deleted = await fetcher.delete({ id: taskId });

    if (deleted) {
      setSelectedKanban((prev) => {
        if (!prev) return prev;
        const updatedColumns = prev.columns.map((col) => ({
          ...col,
          tasks: col.tasks.filter((t) => t.id !== taskId),
        }));
        return { ...prev, columns: updatedColumns };
      });
    }
  };

  return (
    <KanbanTaskContext.Provider
      value={{
        selectedKanbanTask,
        isTaskModalOpen,
        toggleTaskModal,
        createTask,
        selectTask,
        updateTask,
        completeTask,
        moveTaskDragAndDrop,
        deleteTask,
      }}
    >
      {children}
    </KanbanTaskContext.Provider>
  );
};

export { KanbanTaskContext, KanbanTaskProvider };
