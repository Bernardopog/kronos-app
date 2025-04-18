import { Fetcher } from "@/classes/Fetcher";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import { KanbanContext } from "./KanbanContext";

interface IKanbanColumnContext {
  // States
  columnList: IColumn[];

  // Dispatch
  setColumnList: Dispatch<SetStateAction<IColumn[]>>;

  // Functions (CRUD)
  createColumn: (columnName: string) => void;
  updateColumn: (columnId: string, data: IColumn) => void;
  renameColumn: (columnId: string, columnName: string) => void;
  deleteColumn: (columnId: string) => void;
}

const KanbanColumnContext = createContext({} as IKanbanColumnContext);

const KanbanColumnProvider = ({ children }: { children: ReactNode }) => {
  const [columnList, setColumnList] = useState<IColumn[]>([]);

  const { selectedKanban, setSelectedKanban, selectKanban } =
    useContext(KanbanContext);
  const { user } = useContext(AuthContext);

  const kanbanColumnFetcher = new Fetcher("column");

  // Util
  function getIndex(columnId: string): number {
    const index = columnList.findIndex((column) => column.id === columnId);
    return index;
  }

  useEffect(() => {
    if (user && selectedKanban) {
      const getColumnData = async () => {
        const data = (await new Fetcher("column").get({
          id: selectedKanban?.id,
        })) as IColumn[];
        setColumnList(data);
      };
      getColumnData();
    }
  }, [user, selectedKanban]);

  const createColumn = async (columnName: string) => {
    const createdColumn = (await kanbanColumnFetcher.post({
      columnName,
      kanbanId: selectedKanban!.id,
    })) as IColumn;

    if (createdColumn) {
      setColumnList([...columnList, createdColumn]);

      const selectedKanbanColumns = selectedKanban?.columns;

      setSelectedKanban((prev) =>
        prev
          ? {
              ...prev,
              columns: [...(selectedKanbanColumns || []), createdColumn.id],
            }
          : null
      );
    }
  };

  const updateColumn = async (columnId: string, data: IColumn) => {
    const updatedColumn = (await kanbanColumnFetcher.put(
      { color: data.color, icon: data.icon },
      {
        id: columnId,
      }
    )) as IColumn;

    if (updatedColumn.id !== undefined) {
      const columnIndex = getIndex(columnId);

      if (columnIndex < 0) return;
      columnList[columnIndex] = data;

      setColumnList([...columnList]);
      const column = columnList.find((column) => column.id === columnId);

      if (!column) return;

      column.columnName = data.columnName;
      setColumnList([...columnList]);

      selectKanban(selectedKanban!.id);
    }
  };

  const renameColumn = async (columnId: string, columnName: string) => {
    const renamedColumn = await kanbanColumnFetcher.patch(
      { columnName },
      { id: columnId }
    );

    if (renamedColumn) {
      const columnIndex = getIndex(columnId);
      if (columnIndex < 0) return;

      columnList[columnIndex].columnName = columnName;

      setColumnList([...columnList]);
      const column = columnList.find((column) => column.id === columnId);

      if (!column) return;

      column.columnName = columnName;
      setColumnList([...columnList]);
    }
  };

  const deleteColumn = async (columnId: string) => {
    const deletedColumn = await kanbanColumnFetcher.delete({ id: columnId });

    if (deletedColumn) {
      const columnIndex = getIndex(columnId);
      if (!columnIndex) return;

      columnList.splice(columnIndex, 1);
      setColumnList([...columnList]);

      const selectedKanbanColumns = selectedKanban?.columns.filter(
        (column) => column !== columnId
      );

      setSelectedKanban((prev) =>
        prev ? { ...prev, columns: selectedKanbanColumns || [] } : null
      );
    }
  };

  return (
    <KanbanColumnContext.Provider
      value={{
        columnList,
        setColumnList,
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
