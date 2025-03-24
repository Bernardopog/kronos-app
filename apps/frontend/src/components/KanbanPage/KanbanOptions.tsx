"use client";
import { ModalContext } from "@/context/ModalContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { AiFillDelete, AiOutlineTeam } from "react-icons/ai";
import Button from "../Button/Button";
import { RoleType } from "@/mock/kanban/mockKanbans";

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

  return (
    <div className="flex fixed right-4 gap-x-2">
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
            dark:hover:shadow-btn dark:hover:shadow-poppy-600/25`,
          }}
        />
      )}
      <Button
        ariaLabel="Adicionar usuário ao Time do Kanban"
        action={() => {
          setIsKanbanTeamOptionsOpen(!isKanbanTeamOptionsOpen);
        }}
        icon={<AiOutlineTeam />}
        extraStyles={{
          button: `text-woodsmoke-800
            dark:text-woodsmoke-200 
            hover:bg-crud-update-light
            dark:hover:shadow-btn dark:hover:shadow-crud-update-light/25`,
        }}
      />
    </div>
  );
}
