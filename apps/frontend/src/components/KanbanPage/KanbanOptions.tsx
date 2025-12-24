"use client";
import { ModalContext } from "@/context/ModalContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { AiFillDelete, AiOutlineLogout, AiOutlineTeam } from "react-icons/ai";
import { Button } from "@/ui/Button/";

import { RoleType } from "@/mock/kanban/mockKanbans";
import { KanbanContext } from "@/context/KanbanContext";
import { AuthContext } from "@/context/AuthContext";

interface IKanbanOptionsProps {
  isKanbanTeamOptionsOpen: boolean;
  setIsKanbanTeamOptionsOpen: Dispatch<SetStateAction<boolean>>;
  role: RoleType | null;
}

export default function KanbanOptions({
  isKanbanTeamOptionsOpen,
  setIsKanbanTeamOptionsOpen,
  role,
}: IKanbanOptionsProps) {
  const { toggleModal } = useContext(ModalContext);
  const { selectedKanban } = useContext(KanbanContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="flex fixed right-4 gap-x-2">
      {user?.id !== selectedKanban?.userId && (
        <Button
          ariaLabel="Sair do Kanban"
          action={() => {
            toggleModal({
              content: "kanbanLeave",
              type: "delete",
              headerTitle: "Sair do Kanban",
            });
            // removeUserFromKanban(user!.id as string);
          }}
          icon={<AiOutlineLogout />}
          extraStyles={{
            button: `text-woodsmoke-800
          dark:text-woodsmoke-200 
          hover:bg-poppy-600 
          dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-poppy-600/25`,
          }}
        />
      )}
      {role === "admin" && (
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
            button: `text-woodsmoke-800
            dark:text-woodsmoke-200 
            hover:bg-poppy-600 
            dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-poppy-600/25`,
          }}
        />
      )}
      {role !== "read" && (
        <Button
          ariaLabel="Gerenciar time do Kanban"
          action={() => {
            setIsKanbanTeamOptionsOpen(!isKanbanTeamOptionsOpen);
          }}
          icon={<AiOutlineTeam />}
          extraStyles={{
            button: `text-woodsmoke-800
            dark:text-woodsmoke-200 
            hover:bg-crud-update-light
            dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-crud-update-light/25`,
          }}
        />
      )}
    </div>
  );
}
