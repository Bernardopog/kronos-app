"use client";
import Button from "@/components/Button/Button";
import KanbanColumn from "@/components/KanbanPage/KanbanColumn";
import { KanbanContext } from "@/context/KanbanContext";
import { ModalContext } from "@/context/ModalContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export default function Kanban() {
  const { selectKanban, selectedKanban, columnList } =
    useContext(KanbanContext);
  const { toggleModal } = useContext(ModalContext);

  const params = useParams();
  const kanbanId = params.kanban as string;

  useEffect(() => {
    selectKanban(kanbanId);
  }, [kanbanId, columnList, selectedKanban, selectKanban]);

  return (
    <main
      id="main"
      className="page px-8 pb-4 flex flex-col gap-4 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-950"
    >
      <header>
        <h2 className="font-bold text-2xl text-woodsmoke-950 dark:text-woodsmoke-50 ease-in-out duration-300">
          {selectedKanban?.title}
        </h2>
      </header>
      <div className="flex h-full gap-4">
        {columnList
          .filter((column) => column.kanbanId === kanbanId)
          .map((column, index) => (
            <KanbanColumn key={column.id} column={column} index={index} />
          ))}
        {(selectedKanban?.columnsId.length ?? 0) < 8 && (
          <Button
            extraStyles={{
              button: `
              min-w-80 max-w-80 border-dashed rounded-lg text-woodsmoke-900
              dark:text-woodsmoke-200
              hover:bg-apple-600
              dark:hover:shadow-btn dark:hover:shadow-apple-600/25
            `,
            }}
            action={() => {
              toggleModal({
                content: "kanbanCreateColumn",
                type: "create",
                headerTitle: "Criar Coluna",
              });
            }}
            label="Criar Nova Coluna"
            icon={<AiFillPlusCircle />}
          />
        )}
      </div>
    </main>
  );
}
