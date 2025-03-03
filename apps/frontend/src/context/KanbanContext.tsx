"use client";

import mockKanbanList, { IKanban } from "@/mock/kanban/mockKanbans";
import mockColumnList, { IColumn } from "@/mock/kanban/mockKanbanColumns";
import mockKanbanTaskList, {
  IKanbanTask,
  TaskPriorityType,
} from "@/mock/kanban/mockKanbanTasks";
import IdGenerator from "@/utils/IdGenerator";
import { createContext, ReactNode, useState } from "react";

interface CreateTask {
  taskName: string;
  description?: string;
  priority: TaskPriorityType;
}

interface IKanbanContext {
  kanbanList: IKanban[];
  columnList: IColumn[];
  taskList: IKanbanTask[];
  selectedKanban: IKanban | null;
  selectKanban: (id: string) => void;
  createKanban: (title: string) => IKanban;
  createColumn: (title: string) => void;
  createTask: ({ taskName, description, priority }: CreateTask) => void;
}

const KanbanContext = createContext({} as IKanbanContext);

const KanbanProvider = (children: { children: ReactNode }) => {
  const [kanbanList, setKanbanList] = useState<IKanban[]>(mockKanbanList);
  const [columnList, setColumnList] = useState<IColumn[]>(mockColumnList);
  const [taskList, setTaskList] = useState<IKanbanTask[]>(mockKanbanTaskList);

  const [selectedKanban, setSelectedKanban] = useState<IKanban | null>(null);

  const selectKanban = (id: string) => {
    const kanban = kanbanList.find((kanban) => kanban.id === id);
    if (!kanban) return;

    setSelectedKanban(kanban);
  };

  const createKanban = (title: string): IKanban => {
    const newKanban: IKanban = {
      id: new IdGenerator(16).id,
      creator: "",
      title,
      columnsId: [],
      autorizedUsers: [],
    };

    setKanbanList([...kanbanList, newKanban]);
    return newKanban;
  };

  const createColumn = (title: string) => {
    const newColumn: IColumn = {
      id: new IdGenerator(16).id,
      kanbanId: selectedKanban?.id ?? "",
      columnName: title,
      tasksId: [],
    };

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

  return (
    <KanbanContext.Provider
      value={{
        kanbanList,
        columnList,
        taskList,
        selectedKanban,
        selectKanban,
        createKanban,
        createColumn,
        createTask,
      }}
    >
      {children.children}
    </KanbanContext.Provider>
  );
};

export { KanbanContext, KanbanProvider };
