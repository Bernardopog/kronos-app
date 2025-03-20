import Button from "@/components/Button/Button";
import Inert from "@/components/Inert/Inert";
import { KanbanContext } from "@/context/KanbanContext";
import { icons } from "@/icons/icons";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import { Dispatch, SetStateAction, useContext } from "react";
import { AiOutlineSwap } from "react-icons/ai";

interface IColumnChangerProps {
  isColumnOptionsOpen: boolean;
  setIsColumnOptionsOpen: Dispatch<SetStateAction<boolean>>;
  column: IColumn;
  newColumn: IColumn | null;
  setNewColumn: Dispatch<SetStateAction<IColumn | null>>;
}

export default function ColumnChanger({
  isColumnOptionsOpen,
  setIsColumnOptionsOpen,
  column,
  newColumn,
  setNewColumn,
}: IColumnChangerProps) {
  const { columnList } = useContext(KanbanContext);

  return (
    <>
      <div className="flex flex-col items-center w-full gap-x-2 md:flex-row">
        <span>Coluna:</span>
        <div className="flex items-center gap-x-2">
          <span
            style={{
              backgroundColor: `hsla(${column.color[0]}, ${column.color[1]}%, ${column.color[2]}%, 0.5)`,
            }}
            className="flex items-center px-2 rounded-lg gap-x-2 font-bold text-xl"
          >
            {column.icon && (
              <span>{icons[column.icon as keyof typeof icons]}</span>
            )}
            <span>{column.columnName}</span>
          </span>
          <Button
            extraStyles={{ button: `bg-woodsmoke-950 text-woodsmoke-100` }}
            ariaLabel="Trocar coluna"
            action={() => setIsColumnOptionsOpen(!isColumnOptionsOpen)}
            icon={<AiOutlineSwap />}
          />
          {newColumn && (
            <span
              style={{
                backgroundColor: `hsla(${newColumn?.color[0]}, ${newColumn?.color[1]}%, ${newColumn?.color[2]}%, 0.5)`,
              }}
              className="flex items-center px-2 rounded-lg gap-x-2 font-bold text-xl"
            >
              {newColumn?.icon && (
                <span>{icons[newColumn?.icon as keyof typeof icons]}</span>
              )}
              <span>{newColumn?.columnName}</span>
            </span>
          )}
        </div>
      </div>
      <Inert
        value={isColumnOptionsOpen}
        style={`w-full rounded-lg border-woodsmoke-800 duration-300 ease-in-out overflow-clip
      ${isColumnOptionsOpen ? "p-1 border" : "h-0 mt-0 p-0 gap-0 border-none"}  
  `}
      >
        <ul className="grid grid-cols-2 gap-1 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8">
          {columnList
            .filter((allColumns) => allColumns.id !== column.id)
            .map((column) => (
              <li key={column.id} className="relative">
                <div
                  style={{
                    backgroundColor: `hsl(${column.color[0]}, ${column.color[1]}%, ${column.color[2]}%)`,
                  }}
                  className="absolute z-50 w-2 h-full rounded-l-lg"
                />
                <Button
                  extraStyles={{
                    button: `bg-woodsmoke-950 w-full text-woodsmoke-100
                dark:hover:shadow-btn dark:hover:shadow-woodsmoke-100/25
              `,
                    label: "truncate",
                  }}
                  icon={icons[column.icon as keyof typeof icons]}
                  label={column.columnName}
                  action={() => setNewColumn(column)}
                />
              </li>
            ))}
        </ul>
      </Inert>
    </>
  );
}
