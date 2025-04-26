import { Fetcher } from "@/classes/Fetcher";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import { createContext, ReactNode, useContext } from "react";
import { IColumnFullKanban, KanbanContext } from "./KanbanContext";

interface IKanbanColumnContext {
  // States
  columnList: IColumnFullKanban[];

  // Functions (CRUD)
  createColumn: (columnName: string) => void;
  updateColumn: (columnId: string, data: Partial<IColumn>) => void;
  renameColumn: (columnId: string, columnName: string) => void;
  deleteColumn: (columnId: string) => void;
}

const KanbanColumnContext = createContext({} as IKanbanColumnContext);

const KanbanColumnProvider = ({ children }: { children: ReactNode }) => {
  const { selectedKanban, setSelectedKanban } = useContext(KanbanContext);

  const kanbanColumnFetcher = new Fetcher("column");

  const columnList = selectedKanban?.columns || [];

  const createColumn = async (columnName: string) => {
    const newColumn = (await kanbanColumnFetcher.post({
      columnName,
      kanbanId: selectedKanban!.id,
    })) as IColumnFullKanban;

    if (!newColumn) return;

    setSelectedKanban((prev) => ({
      ...prev!,
      columns: [...prev!.columns, newColumn],
    }));
  };

  const updateColumn = async (columnId: string, data: Partial<IColumn>) => {
    const updated = (await kanbanColumnFetcher.put(data, {
      id: columnId,
    })) as IColumnFullKanban;

    if (!updated) return;

    setSelectedKanban((prev) => ({
      ...prev!,
      columns: prev!.columns.map((col) =>
        col.id === columnId ? { ...col, ...data, tasks: col.tasks } : col
      ) as IColumnFullKanban[],
    }));
  };

  const renameColumn = async (columnId: string, columnName: string) => {
    const renamed = await kanbanColumnFetcher.patch(
      { columnName },
      { id: columnId }
    );
    if (!renamed) return;

    setSelectedKanban((prev) => ({
      ...prev!,
      columns: prev!.columns.map((col) =>
        col.id === columnId ? { ...col, columnName } : col
      ) as IColumnFullKanban[],
    }));
  };

  const deleteColumn = async (columnId: string) => {
    const deleted = await kanbanColumnFetcher.delete({ id: columnId });
    if (!deleted) return;

    setSelectedKanban((prev) => ({
      ...prev!,
      columns: prev!.columns.filter((col) => col.id !== columnId),
    }));
  };

  return (
    <KanbanColumnContext.Provider
      value={{
        columnList,
        createColumn,
        updateColumn,
        renameColumn,
        deleteColumn,
      }}
    >
      {children}
    </KanbanColumnContext.Provider>
  );
};

export { KanbanColumnContext, KanbanColumnProvider };
