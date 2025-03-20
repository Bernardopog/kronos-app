"use client";
import Button from "@/components/Button/Button";
import Inert from "@/components/Inert/Inert";
import KanbanColumn from "@/components/KanbanPage/KanbanColumn";
import KanbanModal from "@/components/Modal/KanbanModal/KanbanModal";
import { KanbanContext } from "@/context/KanbanContext";
import { ModalContext } from "@/context/ModalContext";
import { useParams } from "next/navigation";
import { DragEvent, useContext, useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";

export default function Kanban() {
  const {
    selectKanban,
    selectedKanban,
    columnList,
    updateKanban,
    updateColumnDragAndDrop,
    isTaskModalOpen,
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

  const inputRef = useRef<HTMLInputElement>(null);

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
      className={`page relative px-2 pb-4 flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-950
      lg:px-4 lg:overflow-y-clip
      dark:scrollbar-thumb-woodsmoke-600`}
    >
      <header className="flex items-center justify-between">
        {editingTitle ? (
          <input
            ref={inputRef}
            type="text"
            value={kanbanTitle}
            className="w-4/5 font-bold text-2xl text-woodsmoke-950 dark:text-woodsmoke-50 bg-transparent ease-in-out duration-300 truncate"
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
        ) : (
          <h2
            className="font-bold w-4/5 text-2xl text-woodsmoke-950 dark:text-woodsmoke-50 ease-in-out duration-300 cursor-pointer"
            onClick={() => {
              setEditingTitle(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 50);
            }}
          >
            {selectedKanban?.title}
          </h2>
        )}
        <Button
          ariaLabel="Deletar o respectivo kanban"
          action={() => {
            toggleModal({
              content: "kanbanDelete",
              type: "delete",
              headerTitle: "Deletar Kanban",
            });
          }}
          icon={<AiFillDelete />}
          extraStyles={{
            button: `fixed right-4 text-woodsmoke-800
              dark:text-woodsmoke-200 
              hover:bg-poppy-600 
              dark:hover:shadow-btn dark:hover:shadow-poppy-600/25`,
          }}
        />
      </header>
      <Inert
        style={`fixed top-0 left-0 z-50 w-full bg-woodsmoke-100/90 text-woodsmoke-950 duration-300 ease-in-out backdrop-blur-sm overflow-clip
        dark:bg-woodsmoke-950/90 dark:text-woodsmoke-100
        ${isTaskModalOpen ? "h-full px-2 py-8 lg:pl-8 lg:pr-0" : "h-0 p-0"}
      `}
        value={isTaskModalOpen}
      >
        <KanbanModal />
      </Inert>
      <div className="flex h-full gap-2">
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
              button: `min-w-80 max-w-80 min-h-[460px] h-[100dvh] max-h-[calc(100%-6rem)] border-dashed rounded-lg text-woodsmoke-900
              dark:text-woodsmoke-200
              hover:bg-apple-600
              dark:hover:shadow-btn dark:hover:shadow-apple-600/25
              lg:max-h-[85vh]
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
