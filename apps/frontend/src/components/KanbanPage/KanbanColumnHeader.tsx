import { KanbanContext } from "@/context/KanbanContext";
import { icons } from "@/icons/icons";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import { Dispatch, useContext } from "react";
import { AiFillSetting } from "react-icons/ai";
import Button from "../Button/Button";

interface IKanbanColumnHeaderProps {
  column: IColumn;
  columnName: string;
  setColumnName: Dispatch<React.SetStateAction<string>>;
  isOptionsOpen: boolean;
  setIsOptionsOpen: Dispatch<React.SetStateAction<boolean>>;
  isEditingColumnTitle: boolean;
  setEditingIsColumnTitle: Dispatch<React.SetStateAction<boolean>>;
}

export default function KanbanColumnHeader({
  column,
  columnName,
  setColumnName,
  isEditingColumnTitle,
  setEditingIsColumnTitle,
  isOptionsOpen,
  setIsOptionsOpen,
}: IKanbanColumnHeaderProps) {
  const { updateColumn } = useContext(KanbanContext);

  const colorHeader = `hsla(${column.color?.[0]}, ${column.color?.[1]}%, ${column.color?.[2]}%, 0.75)`;

  return (
    <header
      style={{
        backgroundColor: `${colorHeader}`,
      }}
      className="flex items-center justify-between h-12 px-4 bg-woodsmoke-100 ease-in-out duration-300
      dark:bg-woodsmoke-950
      "
    >
      <div className="flex items-center gap-x-2">
        {column.icon && (
          <span
            className={`text-2xl
                ${(column.color?.[2] ?? 0) > 60 ? "text-woodsmoke-950 dark:text-woodsmoke-950" : "text-woodsmoke-50 dark:text-woodsmoke-50"}`}
          >
            {icons[column.icon as keyof typeof icons]}
          </span>
        )}
        {isEditingColumnTitle ? (
          <h2
            className="text-xl font-medium text-woodsmoke-800 cursor-pointer
              dark:text-woodsmoke-200 ease-in-out duration-300
              "
            onClick={() => setEditingIsColumnTitle(true)}
          >
            {column?.columnName}
          </h2>
        ) : (
          <input
            type="text"
            value={columnName}
            className={`w-[60%] font-bold text-2xl bg-transparent ease-in-out duration-300 truncate
                    ${(column.color?.[2] ?? 0) > 60 ? "text-woodsmoke-950 dark:text-woodsmoke-950" : "text-woodsmoke-50 dark:text-woodsmoke-50"}
                  `}
            onChange={(ev) => setColumnName(ev.target.value)}
            onBlur={() => {
              updateColumn(column.id, {
                ...column,
                columnName: columnName,
              });
              setEditingIsColumnTitle(false);
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                updateColumn(column.id, {
                  ...column,
                  columnName: columnName,
                });
                setEditingIsColumnTitle(false);
              }
            }}
          />
        )}
      </div>
      <Button
        action={() => setIsOptionsOpen(!isOptionsOpen)}
        ariaLabel={isOptionsOpen ? "Fechar Configuração" : "Abrir Configuração"}
        icon={<AiFillSetting />}
        extraStyles={{
          button: `
            border rounded-full bg-woodsmoke-100 text-woodsmoke-900
            hover:text-woodsmoke-925
            dark:text-woodsmoke-200 dark:bg-woodsmoke-925
            dark:hover:shadow-btn dark:hover:shadow-woodsmoke-100/25 dark:hover:text-woodsmoke-100
        `,
        }}
      />
    </header>
  );
}
