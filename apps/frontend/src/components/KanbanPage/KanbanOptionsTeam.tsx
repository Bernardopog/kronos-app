import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEdit,
  AiOutlineRead,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import Button from "../Button/Button";
import { useContext, useRef, useState } from "react";
import { KanbanContext } from "@/context/KanbanContext";
import { AuthContext } from "@/context/AuthContext";
import { IAuthorizedUser } from "@/mock/kanban/mockKanbans";
import KanbanUserOptions from "./KanbanUserOptions";

export default function KanbanOptionsTeam() {
  const { userList, user } = useContext(AuthContext);
  const { selectedKanban, addUserToKanban } = useContext(KanbanContext);

  const [isAddingNewMember, setIsAddingNewMember] = useState<boolean>(false);
  const [newMemberId, setNewMemberId] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  function userData(authorizedUser: IAuthorizedUser) {
    const foundUser = userList.find((user) => user.id === authorizedUser.id);
    return {
      username: `@${foundUser?.username}`,
      id: foundUser?.id,
      displayName: foundUser?.displayName,
    };
  }

  function creatorData(userId: string) {
    const foundCreator = userList.find((user) => user.id === userId);
    return {
      username: `@${foundCreator?.username}`,
      id: foundCreator?.id,
      displayName: foundCreator?.displayName,
    };
  }

  const role = selectedKanban?.authorizedUserId.find(
    (authUser) => authUser.id === user?.id
  )?.role;

  let statusMessage = "";

  switch (status) {
    case 200:
      statusMessage = "Usuário adicionado com sucesso!";
      break;
    case 400:
      statusMessage = "Usuário já adicionado!";
      break;
    case 404:
      statusMessage = "Usuário não encontrado!";
      break;
    default:
      statusMessage = "";
  }

  return (
    <>
      <ul className="flex flex-col w-full gap-2 scrollbar-none overflow-y-scroll">
        {selectedKanban && (
          <li
            className="flex flex-col relative p-1 border rounded-lg border-woodsmoke-400 bg-woodsmoke-200 ease-in-out duration-300
        dark:border-woodsmoke-800 dark:bg-woodsmoke-900"
          >
            {creatorData(selectedKanban.userId).displayName ? (
              <span>
                {creatorData(selectedKanban.userId).displayName} -{" "}
                <span className="opacity-50 italic text-[12px]">
                  {`${creatorData(selectedKanban.userId).username}`}
                </span>
              </span>
            ) : (
              <span>{creatorData(selectedKanban.userId).username}</span>
            )}
            <span className="text-[10px] opacity-50">
              #{creatorData(selectedKanban.userId).id}
            </span>
            <span className="text-5xl absolute top-1 right-1 opacity-25">
              <AiOutlineUser />
            </span>
          </li>
        )}
        {selectedKanban?.authorizedUserId.map((authUser) => (
          <li
            key={authUser.id}
            className={`group flex flex-col relative p-1 border rounded-lg
              ${user?.id === authUser.id ? "bg-woodsmoke-300 dark:bg-woodsmoke-900 border-woodsmoke-950 dark:border-woodsmoke-100" : "border-woodsmoke-400 dark:border-woodsmoke-800"}
            `}
          >
            {userData(authUser).displayName ? (
              <span>
                {userData(authUser).displayName} -{" "}
                <span className="opacity-50 italic text-[12px]">
                  {userData(authUser).username}
                </span>
              </span>
            ) : (
              <span>{userData(authUser).username}</span>
            )}
            <span className="text-[10px] opacity-50">
              #{userData(authUser).id}
            </span>
            <span className="text-5xl absolute top-1 right-1 opacity-25">
              {authUser.role === "admin" && <AiOutlineSetting />}
              {authUser.role === "write" && <AiOutlineEdit />}
              {authUser.role === "read" && <AiOutlineRead />}
            </span>
            {(role === "admin" || selectedKanban?.userId === user?.id) && (
              <KanbanUserOptions id={authUser.id} />
            )}
          </li>
        ))}
      </ul>
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
          {status !== 0 && (
            <p
              className={`text-sm ${status === 200 ? "text-apple-600" : "text-poppy-600"}`}
            >
              {statusMessage}
            </p>
          )}
          <div
            className={`flex w-full mt-2 gap-x-2 
              ${isAddingNewMember ? "block" : "hidden"}
            `}
          >
            <Button
              action={() => {
                setIsAddingNewMember(false);
                setNewMemberId("");
                setStatus(0);
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
                  const status = addUserToKanban(newMemberId);
                  setStatus(status);
                  setNewMemberId("");
                  setStatus(0);
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
    </>
  );
}
