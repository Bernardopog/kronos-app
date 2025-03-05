import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Button from "../Button/Button";
import { useContext } from "react";
import { KanbanContext } from "@/context/KanbanContext";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";

interface IKanbanColumnOptionsFooterProps {
  column: IColumn;
  color: number[];
}

export default function KanbanColumnOptionsFooter({
  column,
  color,
}: IKanbanColumnOptionsFooterProps) {
  const { deleteColumn, updateColumn } = useContext(KanbanContext);

  return (
    <div
      className="flex justify-between absolute bottom-12 left-0 w-full h-12 bg-woodsmoke-100 ease-in-out duration-300
      dark:bg-woodsmoke-900"
    >
      <Button
        label="Atualizar"
        extraStyles={{
          button: `w-full rounded-none rounded-bl-lg text-woodsmoke-950
            hover:bg-crud-update-light
            dark:text-woodsmoke-100 
            dark:hover:shadow-btn dark:hover:shadow-crud-update-light/25
          `,
        }}
        icon={<AiFillEdit />}
        action={() => {
          updateColumn(column.id, {
            ...column,
            color: [color[0], color[1], color[2]],
          });
        }}
      />
      <Button
        label="Deletar"
        extraStyles={{
          button: `w-full rounded-none rounded-br-lg text-woodsmoke-950
            hover:bg-poppy-600
            dark:text-woodsmoke-100
            dark:hover:shadow-btn dark:hover:shadow-poppy-600/25
          `,
        }}
        icon={<AiFillDelete />}
        action={() => {
          deleteColumn(column.id);
        }}
      />
    </div>
  );
}
