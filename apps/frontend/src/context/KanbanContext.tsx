"use client";

import { IKanban, RoleType } from "@/mock/kanban/mockKanbans";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import { KanbanTaskProvider } from "./KanbanTaskContext";
import { Fetcher } from "@/classes/Fetcher";
import { KanbanColumnProvider } from "./KanbanColumnContext";

interface IResponse {
  statusCode: number;
  message: string;
}

interface IKanbanContext {
  // States
  kanbanList: IKanban[];
  authorizedKanbanList: IAuthorizedKanban[];
  selectedKanban: IKanban | null;

  // Dispatch
  setSelectedKanban: Dispatch<SetStateAction<IKanban | null>>;

  // Crud
  selectKanban: (id: string) => Promise<number | undefined>;
  createKanban: (title: string) => Promise<IKanban>;
  renameKanban: (title: string) => void;
  deleteKanban: (id: string) => void;

  addUserToKanban: (userId: string) => Promise<number | undefined>;
  removeUserFromKanban: (userId: string) => void;
  changeUserRole: (userId: string, role: RoleType) => void;
}

interface IAuthorizedKanban {
  id: string;
  title: string;
  userId: string;
}

const KanbanContext = createContext({} as IKanbanContext);

const KanbanProvider = (children: { children: ReactNode }) => {
  const [kanbanList, setKanbanList] = useState<IKanban[]>([]);
  const [authorizedKanbanList, setAuthorizedKanbanList] = useState<
    IAuthorizedKanban[]
  >([]);

  const [selectedKanban, setSelectedKanban] = useState<IKanban | null>(null);

  const { user } = useContext(AuthContext);

  const kanbanFetcher = new Fetcher("kanban");

  useEffect(() => {
    if (user) {
      const getKanbanListData = async () => {
        const kanbanData = (await new Fetcher("kanban").get()) as IKanban[];
        setKanbanList(kanbanData);
        const authorizedKanbanData = (await new Fetcher(
          "kanban/authorized"
        ).get()) as IAuthorizedKanban[];
        setAuthorizedKanbanList(authorizedKanbanData);
      };
      getKanbanListData();
    }
  }, [user]);

  const selectKanban = async (id: string) => {
    const response = (await kanbanFetcher.get({ id })) as IKanban | IResponse;

    if ("statusCode" in response) return response.statusCode;
    if (selectedKanban?.id === response.id) return 0;

    if (response) {
      setSelectedKanban(response);
      return 200;
    }
  };
  const createKanban = async (title: string): Promise<IKanban> => {
    const createdKanban = (await kanbanFetcher.post<{ title: string }, IKanban>(
      { title }
    )) as IKanban;

    if (createdKanban) setKanbanList([...kanbanList, createdKanban]);

    return createdKanban;
  };

  const renameKanban = async (title: string) => {
    const renamedKanban = (await kanbanFetcher.patch(
      { title },
      { id: selectedKanban!.id }
    )) as IKanban;

    if (renamedKanban) {
      const kanban = kanbanList.find(
        (kanban) => kanban.id === selectedKanban?.id
      );
      if (!kanban) return;
      kanban.title = title;
      setKanbanList([...kanbanList]);
      setSelectedKanban((prev) => (prev ? { ...prev, title } : null));
    }
  };

  const deleteKanban = async (id: string) => {
    const deletedKanban = (await kanbanFetcher.delete({ id })) as IKanban;

    if (deletedKanban)
      setKanbanList(kanbanList.filter((kanban) => kanban.id !== id));
  };

  const addUserToKanban = async (
    userId: string
  ): Promise<number | undefined> => {
    interface IAddedUser {
      userId: string;
      kanbanId: string;
      id: string;
      role: RoleType;
      user: {
        displayName: string;
        username: string;
      };
    }

    const response = (await kanbanFetcher.post(
      {
        userId,
        kanbanId: selectedKanban!.id,
      },
      { endpoint: "add" }
    )) as IAddedUser;

    if (!response) return 400;

    if (response) {
      setSelectedKanban((prev) =>
        prev
          ? {
              ...prev,
              authorizedUsers: [
                ...prev.authorizedUsers,
                {
                  userId: response.userId,
                  role: response.role,
                  user: response.user,
                },
              ],
            }
          : null
      );
      return 200;
    }
  };

  const removeUserFromKanban = async (userId: string) => {
    const removedUser = await kanbanFetcher.delete(
      { userId, kanbanId: selectedKanban!.id },
      { endpoint: "remove" }
    );

    if (removedUser) {
      setSelectedKanban((prev) =>
        prev
          ? {
              ...prev,
              authorizedUsers: prev.authorizedUsers.filter(
                (user) => user.userId !== userId
              ),
            }
          : null
      );
    }
  };

  const changeUserRole = async (userId: string, role: RoleType) => {
    interface IChangeRole {
      userId: string;
      kanbanId: string;
      role: RoleType;
    }

    interface IChangedRole {
      id: string;
      userId: string;
      kanbanId: string;
      role: RoleType;
    }

    const changedRole = await kanbanFetcher.patch<IChangeRole, IChangedRole>(
      { userId, role, kanbanId: selectedKanban!.id },
      { endpoint: "role" }
    );

    if (changedRole) {
      const user = selectedKanban?.authorizedUsers.find((user) => {
        return user.userId === userId;
      });

      if (!user) return;

      user.role = changedRole.role;
      setSelectedKanban((prev) => (prev ? { ...prev } : null));
    }
  };

  return (
    <KanbanContext.Provider
      value={{
        kanbanList,
        authorizedKanbanList,
        selectedKanban,
        setSelectedKanban,
        selectKanban,
        createKanban,
        renameKanban,
        deleteKanban,
        addUserToKanban,
        removeUserFromKanban,
        changeUserRole,
      }}
    >
      <KanbanColumnProvider>
        <KanbanTaskProvider>{children.children}</KanbanTaskProvider>
      </KanbanColumnProvider>
    </KanbanContext.Provider>
  );
};

export { KanbanContext, KanbanProvider };
