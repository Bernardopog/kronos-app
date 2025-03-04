"use client";
import Button from "@/components/Button/Button";
import KanbanColumn from "@/components/KanbanPage/KanbanColumn";
import { KanbanContext } from "@/context/KanbanContext";
import { ModalContext } from "@/context/ModalContext";
import { useParams } from "next/navigation";
import { DragEvent, useContext, useEffect, useState } from "react";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";

export default function Kanban() {
  const {
    selectKanban,
    selectedKanban,
    columnList,
    updateKanban,
    updateColumnDragAndDrop,
    deleteKanban,
  } = useContext(KanbanContext);
  const { toggleModal } = useContext(ModalContext);

  const params = useParams();
  const kanbanId = params.kanban as string;

  useEffect(() => {
    selectKanban(kanbanId);
    setKanbanTitle(selectedKanban?.title ?? "");
  }, [kanbanId, columnList, selectedKanban, selectKanban]);

  const [kanbanTitle, setKanbanTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);

  const handleDragStart = (
    ev: DragEvent<HTMLLIElement>,
    itemId: string,
    originalColumnId: string
  ) => {
    ev.dataTransfer.setData("itemId", itemId);
    ev.dataTransfer.setData("originalColumnId", originalColumnId);
  };

  const handleDragDrop = (ev: DragEvent<HTMLElement>, columnId: string) => {
    const itemId = ev.dataTransfer.getData("itemId");
    const originalColumnId = ev.dataTransfer.getData("originalColumnId");
    updateColumnDragAndDrop(columnId, itemId, originalColumnId);
  };

  return (
    <main
      id="main"
      className="page px-8 pb-4 flex flex-col gap-4 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-950"
    >
      <header className="flex items-center justify-between">
        {editingTitle ? (
          <h2
            className="font-bold text-2xl text-woodsmoke-950 dark:text-woodsmoke-50 ease-in-out duration-300"
            onClick={() => {
              setEditingTitle(true);
            }}
          >
            {selectedKanban?.title}
          </h2>
        ) : (
          <input
            type="text"
            value={kanbanTitle}
            className="w-[60%] font-bold text-2xl text-woodsmoke-950 dark:text-woodsmoke-50 bg-transparent ease-in-out duration-300 truncate"
            onChange={(ev) => setKanbanTitle(ev.target.value)}
            onBlur={() => {
              updateKanban(kanbanTitle);
              setEditingTitle(false);
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                updateKanban(kanbanTitle);
                setEditingTitle(false);
              }
            }}
          />
        )}
        <Button
          action={() => {
            toggleModal({
              content: "kanbanDelete",
              type: "delete",
              headerTitle: "Deletar Kanban",
            });
            deleteKanban(kanbanId);
          }}
          icon={<AiFillDelete />}
          extraStyles={{
            button: `text-woodsmoke-800
              dark:text-woodsmoke-200 
              hover:bg-poppy-600 
              dark:hover:shadow-btn dark:hover:shadow-poppy-600/25`,
          }}
        />
      </header>
      <div className="flex h-full gap-4">
        {columnList
          .filter((column) => column.kanbanId === kanbanId)
          .map((column, index) => (
            <KanbanColumn
              key={column.id}
              column={column}
              index={index}
              dragStart={handleDragStart}
              dragDrop={handleDragDrop}
            />
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
