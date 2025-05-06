import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import { createContext, ReactNode, useContext } from "react";
import { IColumnFullKanban, KanbanContext } from "./KanbanContext";
import { SocketContext } from "./SocketContext";

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
  const { selectedKanban } = useContext(KanbanContext);
  const { socketKanban } = useContext(SocketContext);

  const columnList = selectedKanban?.columns || [];

  const createColumn = async (columnName: string) => {
    if (!socketKanban) return;

    socketKanban.emit("createColumn", {
      columnName,
      kanbanId: selectedKanban!.id,
    });
  };

  const updateColumn = async (columnId: string, data: Partial<IColumn>) => {
    if (!socketKanban) return;
    socketKanban.emit("updateColumn", { columnId, data });
  };

  const renameColumn = async (columnId: string, columnName: string) => {
    if (!socketKanban) return;
    socketKanban.emit("renameColumn", { columnId, columnName });
  };

  const deleteColumn = async (columnId: string) => {
    if (!socketKanban) return;
    socketKanban.emit("deleteColumn", columnId);

    // const deleted = await kanbanColumnFetcher.delete({ id: columnId });
    // if (!deleted) return;

    // setSelectedKanban((prev) => ({
    //   ...prev!,
    //   columns: prev!.columns.filter((col) => col.id !== columnId),
    // }));
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
