import {
  AiOutlineEdit,
  AiOutlineRead,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import Button from "../Button/Button";
import { useContext } from "react";
import { KanbanContext } from "@/context/KanbanContext";
import { AuthContext } from "@/context/AuthContext";
import { IAuthorizedUser } from "@/mock/kanban/mockKanbans";

export default function KanbanOptionsTeam() {
  const { userList, user } = useContext(AuthContext);
  const { selectedKanban } = useContext(KanbanContext);

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
            className={`flex flex-col relative p-1 border rounded-lg
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
          </li>
        ))}
      </ul>
      {(role === "admin" || selectedKanban?.userId === user?.id) && (
        <Button
          extraStyles={{
            button: `text-woodsmoke-950 w-full mt-2 border-dashed
          hover:bg-apple-600
          dark:text-woodsmoke-100
          dark:hover:shadow-btn dark:hover:shadow-apple-600/25`,
          }}
          label="Adicionar Membro"
          icon={<AiOutlineUserAdd />}
        />
      )}
    </>
  );
}
