"use client";
import Button from "@/components/Button/Button";
import Inert from "@/components/Inert/Inert";
import KanbanColumn from "@/components/KanbanPage/KanbanColumn";
import KanbanOptions from "@/components/KanbanPage/KanbanOptions";
import KanbanOptionsTeam from "@/components/KanbanPage/KanbanOptionsTeam";
import KanbanModal from "@/components/Modal/KanbanModal/KanbanModal";
import { AuthContext } from "@/context/AuthContext";
import { KanbanContext } from "@/context/KanbanContext";
import { ModalContext } from "@/context/ModalContext";
import { RoleType } from "@/mock/kanban/mockKanbans";
import { redirect, useParams } from "next/navigation";
import {
  DragEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AiFillPlusCircle } from "react-icons/ai";

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

  const { user } = useContext(AuthContext);

  const params = useParams();
  const kanbanId = params.kanban as string;

  useEffect(() => {
    selectKanban(kanbanId);
    setKanbanTitle(selectedKanban?.title ?? "");
  }, [kanbanId, columnList, selectedKanban, selectKanban]);

  const [kanbanTitle, setKanbanTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);

  const [role, setRole] = useState<RoleType | null>(null);

  const [isKanbanTeamOptionsOpen, setIsKanbanTeamOptionsOpen] =
    useState<boolean>(false);

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

  useLayoutEffect(() => {
    if (selectedKanban?.userId === user?.id) {
      return;
    }
    if (
      !selectedKanban?.authorizedUserId.find(
        (authUser) => authUser.id === user?.id
      )
    ) {
      redirect("/kanbanlist");
    }
  }, [selectedKanban, user]);

  useEffect(() => {
    const roleInSelectedKanban = selectedKanban?.authorizedUserId.find(
      (authUser) => authUser.id === user?.id
    )?.role;

    if (user) {
      if (selectedKanban?.userId === user.id) {
        setRole("admin");
      } else if (roleInSelectedKanban === "admin") {
        setRole("admin");
      } else if (roleInSelectedKanban === "write") {
        setRole("write");
      } else if (roleInSelectedKanban === "read") {
        setRole("read");
      }
    }
  }, [selectedKanban?.authorizedUserId, selectedKanban?.userId, user]);

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
            className={`font-bold w-4/5 text-2xl text-woodsmoke-950 dark:text-woodsmoke-50 ease-in-out duration-300
              ${role === "admin" && "cursor-pointer"}`}
            onClick={() => {
              if (role !== "admin") return;
              setEditingTitle(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 50);
            }}
          >
            {selectedKanban?.title}
          </h2>
        )}
        {role !== "read" && (
          <KanbanOptions
            isKanbanTeamOptionsOpen={isKanbanTeamOptionsOpen}
            setIsKanbanTeamOptionsOpen={setIsKanbanTeamOptionsOpen}
            role={role}
          />
        )}
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
      {role !== "read" && (
        <Inert
          style={`flex flex-col items-center fixed top-28 right-4 z-50 w-64 rounded-lg border-woodsmoke-400 bg-woodsmoke-100/90 text-woodsmoke-950 duration-300 ease-in-out backdrop-blur-sm overflow-clip
          dark:bg-woodsmoke-950/90 dark:border-woodsmoke-800 dark:text-woodsmoke-100
        ${isKanbanTeamOptionsOpen ? "min-h-40 h-[80vh] max-h-[80vh] p-4 border" : "h-0 p-0 border-none"}
      `}
          value={isKanbanTeamOptionsOpen}
        >
          <KanbanOptionsTeam />
        </Inert>
      )}
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
              role={role}
            />
          ))}
        {(selectedKanban?.columnsId.length ?? 0) < 8 && role !== "read" && (
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
