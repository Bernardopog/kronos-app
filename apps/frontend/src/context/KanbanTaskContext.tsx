import { createContext, ReactNode, useContext, useState } from "react";
import { TaskPriorityType } from "@/mock/kanban/mockKanbanTasks";
import { ITaskFullKanban, KanbanContext } from "./KanbanContext";
import { SocketContext } from "./SocketContext";

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

  const { selectedKanban } = useContext(KanbanContext);
  const { socketKanban } = useContext(SocketContext);

  const toggleTaskModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };

  const selectTask = async (taskId: string) => {
    if (!selectedKanban) return;
    const task = selectedKanban.columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === taskId);
    if (task) setSelectedKanbanTask(task);
  };

  const createTask = async ({
    taskName,
    description,
    priority,
  }: CreateTask) => {
    if (!socketKanban) return;
    if (!selectedKanban) return;

    const columnId = selectedKanban.columns[0].id;

    socketKanban.emit("createKanbanTask", {
      kanbanId: selectedKanban.id,
      data: { taskName, description, priority, columnId },
    });
  };

  const updateTask = async (taskId: string, data: ITaskFullKanban) => {
    if (!socketKanban) return;
    if (!selectedKanban) return;

    const body = {
      taskName: data.taskName,
      description: data.description,
      priority: data.priority,
      completionDate: data.completionDate,
      team: data.team,
      columnId: data.columnId,
    };
    socketKanban.emit("updateKanbanTask", {
      kanbanId: selectedKanban.id,
      id: taskId,
      data: body,
    });
  };

  const completeTask = async (taskId: string) => {
    if (!socketKanban) return;
    if (!selectedKanban) return;
    socketKanban.emit("completeKanbanTask", {
      kanbanId: selectedKanban.id,
      id: taskId,
    });

    // const updated = await fetcher.patch({ id: taskId, endpoint: "complete" });

    // if (updated) {
    //   setSelectedKanban((prev) => {
    //     if (!prev) return prev;
    //     const updatedColumns = prev.columns.map((col) => {
    //       const tasks = col.tasks ?? [];
    //       return {
    //         ...col,
    //         tasks: tasks.map((task) =>
    //           task.id === taskId
    //             ? { ...task, isCompleted: !task.isCompleted }
    //             : task
    //         ),
    //       };
    //     });
    //     return { ...prev, columns: updatedColumns };
    //   });
    // }
  };

  const moveTaskDragAndDrop = async (
    columnId: string,
    itemId: string,
    originalColumnId: string
  ) => {
    if (columnId === originalColumnId) return;
    if (!socketKanban) return;
    if (!selectedKanban) return;
    socketKanban.emit("moveKanbanTaskToColumn", {
      kanbanId: selectedKanban.id,
      id: itemId,
      columnId,
    });
  };

  const deleteTask = async (taskId: string) => {
    if (!socketKanban) return;
    if (!selectedKanban) return;
    socketKanban.emit("deleteKanbanTask", {
      kanbanId: selectedKanban.id,
      id: taskId,
    });
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
