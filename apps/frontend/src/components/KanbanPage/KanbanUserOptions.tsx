"use client";

import { useContext, useState } from "react";
import Inert from "@/ui/Inert";

import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/ui/Button/";

import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillRead,
  AiOutlineEdit,
  AiOutlineEllipsis,
  AiOutlineLogout,
  AiOutlineRead,
  AiOutlineSetting,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { KanbanContext } from "@/context/KanbanContext";
import { redirect } from "next/navigation";

interface IKanbanUserOptionsProps {
  id: string;
}

export default function KanbanUserOptions({ id }: IKanbanUserOptionsProps) {
  const { user } = useContext(AuthContext);
  const { removeUserFromKanban, changeUserRole } = useContext(KanbanContext);

  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState<boolean>(false);
  const [isConfirmingRemove, setIsConfirmingRemove] = useState<boolean>(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        extraStyles={{
          button: `absolute z-40 top-0 right-0 h-full border-none rounded-l-none rounded-r-lg bg-woodsmoke-950 text-woodsmoke-100 opacity-0
          group-hover:opacity-100
          $`,
        }}
        ariaLabel="Abrir Opções de Usuário"
        action={() => setIsUserOptionsOpen(!isUserOptionsOpen)}
        icon={<AiOutlineEllipsis />}
      />
      <Inert
        value={isUserOptionsOpen}
        style={`flex items-center absolute top-0 left-0 bg-woodsmoke-200 size-full gap-x-2 rounded-lg ease-in-out duration-300 overflow-clip
          dark:bg-woodsmoke-950
          ${isUserOptionsOpen ? "w-full px-1.5" : "w-0 p-0"}`}
      >
        {isConfirmingRemove ? (
          <>
            <Button
              extraStyles={{
                button: `text-woodsmoke-950
                  hover:bg-apple-600
                  dark:text-woodsmoke-100
                  dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-apple-600/25`,
              }}
              ariaLabel="Cancelar Ação"
              icon={<AiFillCloseCircle />}
              action={() => setIsConfirmingRemove(false)}
            />
            <Button
              extraStyles={{
                button: `text-woodsmoke-950
                  hover:bg-poppy-600
                  dark:text-woodsmoke-100
                  dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-poppy-600/25`,
              }}
              ariaLabel="Confirmar Ação"
              icon={<AiFillCheckCircle />}
              action={() => {
                removeUserFromKanban(id);
                setIsUserOptionsOpen(false);

                if (id === user?.id) redirect("/kanbanlist");
              }}
            />
          </>
        ) : (
          <Button
            extraStyles={{
              button: `text-woodsmoke-950
              hover:bg-poppy-600
              dark:text-woodsmoke-100
              dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-poppy-600/25`,
            }}
            ariaLabel={
              user?.id === id ? "Sair deste Kanban" : "Remover deste Kanban"
            }
            icon={
              user?.id === id ? <AiOutlineLogout /> : <AiOutlineUserDelete />
            }
            action={() => {
              setIsConfirmingRemove(true);
              setIsEditRoleOpen(false);
            }}
          />
        )}
        {isEditRoleOpen ? (
          <>
            <Button
              icon={<AiOutlineSetting />}
              ariaLabel="Mudar para Admin"
              action={() => {
                setIsEditRoleOpen(false);
                changeUserRole(id, "admin");
              }}
            />
            <Button
              icon={<AiOutlineEdit />}
              ariaLabel="Mudar para Editor"
              action={() => {
                setIsEditRoleOpen(false);
                changeUserRole(id, "write");
              }}
            />
            <Button
              icon={<AiOutlineRead />}
              ariaLabel="Mudar para Leitor"
              action={() => {
                setIsEditRoleOpen(false);
                changeUserRole(id, "read");
              }}
            />
          </>
        ) : (
          <Button
            extraStyles={{
              button: `text-woodsmoke-950
              hover:bg-crud-update-light
              dark:text-woodsmoke-100
              dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-crud-update-light/25`,
            }}
            ariaLabel="Editar Usuário"
            icon={<AiFillRead />}
            action={() => {
              setIsEditRoleOpen(true);
              setIsConfirmingRemove(false);
            }}
          />
        )}
      </Inert>
    </>
  );
}
