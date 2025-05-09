import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEdit,
  AiOutlineRead,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { Button } from "@/ui/Button/";

import { useContext, useEffect, useRef, useState } from "react";
import { KanbanContext } from "@/context/KanbanContext";
import { AuthContext } from "@/context/AuthContext";
import KanbanUserOptions from "./KanbanUserOptions";
import { RoleType } from "@/mock/kanban/mockKanbans";

export default function KanbanOptionsTeam() {
  const { user } = useContext(AuthContext);
  const { selectedKanban, addUserToKanban } = useContext(KanbanContext);

  const [role, setRole] = useState<RoleType | null>(null);
  const [newMemberId, setNewMemberId] = useState<string>("");
  const [isAddingNewMember, setIsAddingNewMember] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user && selectedKanban) {
      const authUser = selectedKanban?.authorizedUsers.find(
        (authUser) => authUser.userId === user.id
      );
      if (authUser) {
        setRole(authUser.role);
      }
    }
  }, [user, selectedKanban]);

  return (
    <ul className="flex flex-col w-full gap-2 scrollbar-none overflow-y-scroll">
      {selectedKanban && user && (
        <li
          className="flex flex-col relative p-1 border rounded-lg border-woodsmoke-400 bg-woodsmoke-200 ease-in-out duration-300
        dark:border-woodsmoke-800 dark:bg-woodsmoke-900"
        >
          {selectedKanban.user.displayName ? (
            <span>
              {selectedKanban.user.displayName} -{" "}
              <span className="opacity-50 italic text-[12px]">
                {`${selectedKanban.user.username}`}
              </span>
            </span>
          ) : (
            <span>{selectedKanban.user.username}</span>
          )}
          <span className="text-[10px] opacity-50">
            #{selectedKanban.userId}
          </span>
          <span className="text-5xl absolute top-1 right-1 opacity-25">
            <AiOutlineUser />
          </span>
        </li>
      )}
      {selectedKanban?.authorizedUsers.map((authUser) => (
        <li
          key={authUser.userId}
          className={`group flex flex-col relative p-1 border rounded-lg
              ${user?.id === authUser.userId ? "bg-woodsmoke-300 dark:bg-woodsmoke-900 border-woodsmoke-950 dark:border-woodsmoke-100" : "border-woodsmoke-400 dark:border-woodsmoke-800"}
            `}
        >
          {authUser.user.displayName ? (
            <span>
              {authUser.user.displayName} -{" "}
              <span className="opacity-50 italic text-[12px]">
                {authUser.user.username}
              </span>
            </span>
          ) : (
            <span>{authUser.user.username}</span>
          )}
          <span className="text-[10px] opacity-50">#{authUser.userId}</span>
          <span className="text-5xl absolute top-1 right-1 opacity-25">
            {authUser.role === "admin" && <AiOutlineSetting />}
            {authUser.role === "write" && <AiOutlineEdit />}
            {authUser.role === "read" && <AiOutlineRead />}
          </span>
          {(role === "admin" || selectedKanban?.userId === user?.id) && (
            <KanbanUserOptions id={authUser.userId} />
          )}
        </li>
      ))}
      {(role === "admin" || selectedKanban?.userId === user?.id) && (
        <>
          <input
            ref={inputRef}
            type="text"
            className={`w-full mt-2 p-1.5 border rounded-lg text-sm bg-transparent border-woodsmoke-300
              dark:border-woodsmoke-800
              ${isAddingNewMember ? "block" : "hidden"}
            `}
            placeholder="Insira o ID do usuário"
            value={newMemberId}
            onChange={(ev) => setNewMemberId(ev.target.value)}
          />
          <div
            className={`flex w-full mt-2 gap-x-2 
              ${isAddingNewMember ? "block" : "hidden"}
            `}
          >
            <Button
              action={() => {
                setIsAddingNewMember(false);
                setNewMemberId("");
              }}
              extraStyles={{
                button: `text-woodsmoke-950 w-full
                hover:bg-poppy-600
                dark:text-woodsmoke-100
                dark:hover:shadow-btn dark:hover:shadow-poppy-600/25`,
              }}
              ariaLabel="Cancelar"
              icon={<AiFillCloseCircle />}
            />
            <Button
              action={() => {
                if (newMemberId) {
                  addUserToKanban(newMemberId);
                  setNewMemberId("");
                }
              }}
              extraStyles={{
                button: `text-woodsmoke-950 w-full
                hover:bg-apple-600
                dark:text-woodsmoke-100
                dark:hover:shadow-btn dark:hover:shadow-apple-600/25`,
              }}
              ariaLabel="Adicionar"
              icon={<AiFillCheckCircle />}
            />
          </div>
          <Button
            action={() => {
              setIsAddingNewMember(true);
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            extraStyles={{
              button: `text-woodsmoke-950 w-full mt-2 border-dashed
            hover:bg-apple-600
            dark:text-woodsmoke-100
            dark:hover:shadow-btn dark:hover:shadow-apple-600/25`,
            }}
            label="Adicionar Membro"
            icon={<AiOutlineUserAdd />}
          />
        </>
      )}
    </ul>
  );
}
