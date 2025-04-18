import { Fetcher } from "@/classes/Fetcher";
import { IKanbanTask, TaskPriorityType } from "@/mock/kanban/mockKanbanTasks";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import { KanbanContext } from "./KanbanContext";
import { KanbanColumnContext } from "./KanbanColumnContext";

interface CreateTask {
  taskName: string;
  description?: string;
  priority: TaskPriorityType;
}

interface UpdateTask extends IKanbanTask {
  columnId: string | undefined;
}

interface IKanbanTaskContext {
  // States
  taskList: IKanbanTask[];
  selectedKanbanTask: IKanbanTask | null;
  isTaskModalOpen: boolean;

  // Control
  toggleTaskModal: () => void;

  // Functions (CRUD)
  createTask: ({ taskName, description, priority }: CreateTask) => void;
  selectTask: (taskId: string) => void;
  updateTask: (taskId: string, data: UpdateTask) => void;
  completeTask: (taskId: string) => void;
  moveTaskDragAndDrop: (
    columnId: string,
    itemId: string,
    originalColumnId: string
  ) => void;
  deleteTask: (id: string) => void;
}

const KanbanTaskContext = createContext({} as IKanbanTaskContext);

const KanbanTaskProvider = ({ children }: { children: ReactNode }) => {
  const [taskList, setTaskList] = useState<IKanbanTask[]>([]);
  const [selectedKanbanTask, setSelectedKanbanTask] =
    useState<IKanbanTask | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  const { selectedKanban } = useContext(KanbanContext);
  const { setColumnList, columnList } = useContext(KanbanColumnContext);

  const { user } = useContext(AuthContext);

  const kanbanTaskFetcher = new Fetcher("kanbantask");

  useEffect(() => {
    if (user) {
      const getTaskListData = async () => {
        const data = (await new Fetcher("kanbantask").get()) as IKanbanTask[];
        setTaskList(data);
      };
      getTaskListData();
    }
  }, [user]);

  const toggleTaskModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };

  const selectTask = async (taskId: string) => {
    const selectedTask = (await kanbanTaskFetcher.get({
      id: taskId,
    })) as IKanbanTask;

    if (selectedTask) setSelectedKanbanTask(selectedTask);
  };

  const createTask = async ({
    taskName,
    description,
    priority,
  }: CreateTask) => {
    interface CreateTaskWithColumn extends CreateTask {
      columnId: string;
    }

    const createdTask = await kanbanTaskFetcher.post<
      CreateTaskWithColumn,
      IKanbanTask
    >({
      taskName,
      description,
      priority,
      columnId: selectedKanban!.columns[0],
    });

    if (createdTask) {
      setTaskList([...taskList, createdTask]);
      setColumnList((prev) =>
        prev.map((column, index) =>
          index === 0
            ? { ...column, tasks: [...column.tasks, createdTask.id] }
            : column
        )
      );
    }
  };

  const updateTask = async (taskid: string, data: UpdateTask) => {
    const body = {
      taskName: data.taskName,
      description: data.description,
      priority: data.priority,
      completionDate: data.completionDate
        ? new Date(data.completionDate)
        : null,
      team: data.team,
      columnId: data.columnId,
    };

    const updatedTask = await kanbanTaskFetcher.put<typeof body, IKanbanTask>(
      body,
      { id: taskid }
    );

    if (updatedTask) {
      const taskIndex = taskList.findIndex((task) => task.id === taskid);
      if (taskIndex === -1) return;

      taskList[taskIndex] = updatedTask;
      setTaskList([...taskList]);
    }
  };

  const completeTask = async (taskId: string) => {
    const completedTask = await kanbanTaskFetcher.patch({
      id: taskId,
      endpoint: "complete",
    });

    if (completedTask) {
      const taskIndex = taskList.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return;

      taskList[taskIndex].isCompleted = !taskList[taskIndex].isCompleted;
      setTaskList([...taskList]);
    }
  };

  const moveTaskDragAndDrop = async (
    columnId: string,
    itemId: string,
    originalColumnId: string
  ) => {
    const movedTask = await kanbanTaskFetcher.patch(
      { columnId },
      { id: itemId }
    );

    if (movedTask) {
      const originalColumn = columnList.find(
        (column) => column.id === originalColumnId
      );
      if (!originalColumn) return;
      const column = columnList.find((column) => column.id === columnId);

      if (!column) return;
      originalColumn.tasks = originalColumn.tasks.filter(
        (taskId) => taskId !== itemId
      );

      column.tasks.push(itemId);
      setColumnList([...columnList]);
    }
  };

  const deleteTask = async (taskId: string) => {
    const deletedTask = await kanbanTaskFetcher.delete<
      Partial<IKanbanTask>,
      Partial<IKanbanTask>
    >({ id: taskId });

    if (deletedTask) {
      const taskIndex = taskList.findIndex((task) => task.id === taskId);
      if (taskIndex < 0) return;

      taskList.splice(taskIndex, 1);
      setTaskList([...taskList]);
    }
  };

  return (
    <KanbanTaskContext.Provider
      value={{
        taskList,
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
