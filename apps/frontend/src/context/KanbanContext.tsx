"use client";

import mockKanbanList, {
  IAuthorizedUser,
  IKanban,
  RoleType,
} from "@/mock/kanban/mockKanbans";
import mockColumnList, { IColumn } from "@/mock/kanban/mockKanbanColumns";
import mockKanbanTaskList, {
  IKanbanTask,
  TaskPriorityType,
} from "@/mock/kanban/mockKanbanTasks";
import IdGenerator from "@/utils/IdGenerator";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";

interface CreateTask {
  taskName: string;
  description?: string;
  priority: TaskPriorityType;
}

interface IKanbanContext {
  kanbanList: IKanban[];
  authorizedKanbanList: IKanban[];
  columnList: IColumn[];
  taskList: IKanbanTask[];
  selectedKanban: IKanban | null;
  selectedKanbanTask: IKanbanTask | null;
  selectKanban: (id: string) => void;
  selectKanbanTask: (id: string) => void;
  createKanban: (title: string) => IKanban;
  createColumn: (title: string) => void;
  createTask: ({ taskName, description, priority }: CreateTask) => void;
  updateKanban: (title: string) => void;
  updateColumnDragAndDrop: (
    columnId: string,
    itemId: string,
    originalColumnId: string
  ) => void;
  updateColumn: (id: string, data: IColumn) => void;
  updateTask: (id: string, data: IKanbanTask) => void;
  deleteKanban: (id: string) => void;
  deleteColumn: (id: string) => void;
  deleteTask: (id: string) => void;

  addUserToKanban: (id: string) => number;
  removeUserFromKanban: (id: string) => void;
  changeUserRole: (id: string, role: RoleType) => void;

  toggleTaskModal: () => void;
  isTaskModalOpen: boolean;
}

const KanbanContext = createContext({} as IKanbanContext);

const KanbanProvider = (children: { children: ReactNode }) => {
  const [kanbanList, setKanbanList] = useState<IKanban[]>(mockKanbanList);
  const [authorizedKanbanList, setAuthorizedKanbanList] =
    useState<IKanban[]>(mockKanbanList);
  const [columnList, setColumnList] = useState<IColumn[]>(mockColumnList);
  const [taskList, setTaskList] = useState<IKanbanTask[]>(mockKanbanTaskList);

  const [selectedKanban, setSelectedKanban] = useState<IKanban | null>(null);
  const [selectedKanbanTask, setSelectedKanbanTask] =
    useState<IKanbanTask | null>(null);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  const { user, userList } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setKanbanList((prev) =>
        prev.filter((kanban) => kanban.userId === user.id)
      );
      setAuthorizedKanbanList(
        mockKanbanList.filter((kanban) =>
          kanban.authorizedUserId.some((authUser) => authUser.id === user.id)
        )
      );
    } else {
      setKanbanList(mockKanbanList);
    }
  }, [user]);

  const selectKanban = (id: string) => {
    const kanban = kanbanList.find((kanban) => kanban.id === id);
    let invitedKanban: IKanban | null = null;

    if (!kanban) {
      invitedKanban =
        authorizedKanbanList.find((kanban) => kanban.id === id) ?? null;
    }

    if (!kanban && !invitedKanban) return;
    setSelectedKanban(kanban ?? invitedKanban);
  };

  const selectKanbanTask = (id: string) => {
    const kanbanTask = taskList.find((task) => task.id === id);
    if (!kanbanTask) return;

    setSelectedKanbanTask(kanbanTask);
  };

  const createKanban = (title: string): IKanban => {
    const newKanban: IKanban = {
      id: new IdGenerator(16).id,
      title,
      columnsId: [],
      userId: user?.id ?? "",
      authorizedUserId: [],
    };
    mockKanbanList.push(newKanban);

    setKanbanList([...kanbanList, newKanban]);
    return newKanban;
  };

  const createColumn = (title: string) => {
    const newColumnId = new IdGenerator(16).id;
    const newColumn: IColumn = {
      id: newColumnId,
      kanbanId: selectedKanban?.id ?? "",
      columnName: title,
      tasksId: [],
      color: [0, 0, 10],
    };

    selectedKanban?.columnsId.push(newColumnId);
    setKanbanList(kanbanList);
    setColumnList([...columnList, newColumn]);
  };

  const createTask = ({ taskName, description, priority }: CreateTask) => {
    const newTaskId: string = new IdGenerator(16).id;

    const newTask: IKanbanTask = {
      id: newTaskId,
      taskName,
      description,
      priority,
      isCompleted: false,
      creationDate: new Date(),
    };

    const firstColumn = columnList.find(
      (column) => column.kanbanId === selectedKanban?.id
    );
    if (!firstColumn) return;

    firstColumn.tasksId.push(newTaskId);

    setTaskList([...taskList, newTask]);
  };

  const updateKanban = (title: string) => {
    const kanban = kanbanList.find(
      (kanban) => kanban.id === selectedKanban?.id
    );
    if (!kanban) return;

    kanban.title = title;
    setKanbanList([...kanbanList]);
  };

  const updateColumnDragAndDrop = (
    columnId: string,
    itemId: string,
    originalColumnId: string
  ) => {
    const originalColumn = columnList.find(
      (column) => column.id === originalColumnId
    );
    if (!originalColumn) return;

    const column = columnList.find((column) => column.id === columnId);
    if (!column) return;

    originalColumn.tasksId = originalColumn.tasksId.filter(
      (taskId) => taskId !== itemId
    );

    column.tasksId.push(itemId);

    setColumnList([...columnList]);
  };

  const updateColumn = (id: string, data: IColumn) => {
    const columnIndex = columnList.findIndex((column) => column.id === id);
    if (columnIndex === -1) return;

    columnList[columnIndex] = data;
    setColumnList([...columnList]);
  };

  const updateTask = (id: string, data: IKanbanTask) => {
    const taskIndex = taskList.findIndex((task) => task.id === id);
    if (taskIndex === -1) return;

    taskList[taskIndex] = data;
    setTaskList([...taskList]);
  };

  const deleteTask = (taskId: string) => {
    const taskIndex = taskList.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    taskList.splice(taskIndex, 1);
    setTaskList([...taskList]);
  };

  const deleteColumn = (columnId: string) => {
    const columnIndex = columnList.findIndex(
      (column) => column.id === columnId
    );
    if (columnIndex === -1) return;

    const columnToDelete = columnList[columnIndex];
    if (columnToDelete.tasksId.length > 0)
      columnToDelete.tasksId.forEach((taskId) => deleteTask(taskId));

    columnList.splice(columnIndex, 1);
    setColumnList([...columnList]);
  };

  const deleteKanban = (id: string) => {
    const kanbanIndex = kanbanList.findIndex((kanban) => kanban.id === id);
    if (kanbanIndex === -1) return;

    const kanbanToDelete = kanbanList[kanbanIndex];
    kanbanToDelete.columnsId.forEach((columnId) => deleteColumn(columnId));

    const kanban = kanbanList.find((kanban) => kanban.id === id);
    if (!kanban) return;

    setKanbanList(kanbanList.filter((kanban) => kanban.id !== id));
  };

  const toggleTaskModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };

  const addUserToKanban = (id: string) => {
    const userFound = userList.find((user) => user.id === id);
    if (!userFound) return 404;

    const userToAdd: IAuthorizedUser = {
      id: userFound.id,
      role: "read",
    };

    const kanban = mockKanbanList.find(
      (kanban) => kanban.id === selectedKanban?.id
    );
    if (!kanban) return 404;

    const alreadyExist = kanban.authorizedUserId.find((user) => user.id === id);
    if (alreadyExist) return 400;

    kanban.authorizedUserId.push(userToAdd);
    setKanbanList([...kanbanList]);
    return 200;
  };

  const removeUserFromKanban = (id: string) => {
    const kanban = mockKanbanList.find((kanban) => {
      return kanban.id === selectedKanban?.id;
    });
    if (!kanban) return;

    kanban.authorizedUserId = kanban.authorizedUserId.filter(
      (user) => user.id !== id
    );

    setKanbanList([...kanbanList]);
    setAuthorizedKanbanList([...authorizedKanbanList]);
  };

  const changeUserRole = (id: string, role: RoleType) => {
    const kanban = mockKanbanList.find(
      (kanban) => kanban.id === selectedKanban?.id
    );
    if (!kanban) return;

    const user = kanban.authorizedUserId.find((user) => user.id === id);
    if (!user) return;

    user.role = role;
    setKanbanList([...kanbanList]);
  };

  return (
    <KanbanContext.Provider
      value={{
        kanbanList,
        authorizedKanbanList,
        columnList,
        taskList,
        selectedKanban,
        selectedKanbanTask,
        selectKanban,
        selectKanbanTask,
        createKanban,
        createColumn,
        createTask,
        updateKanban,
        updateColumnDragAndDrop,
        updateColumn,
        updateTask,
        deleteKanban,
        deleteColumn,
        deleteTask,
        toggleTaskModal,
        isTaskModalOpen,
        addUserToKanban,
        removeUserFromKanban,
        changeUserRole,
      }}
    >
      {children.children}
    </KanbanContext.Provider>
  );
};

export { KanbanContext, KanbanProvider };
