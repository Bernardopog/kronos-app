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
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import { TaskPriorityType } from "@/mock/kanban/mockKanbanTasks";
import { SocketContext } from "./SocketContext";
import { redirect, usePathname } from "next/navigation";

export interface ITaskFullKanban {
  id: string;
  taskName: string;
  priority: TaskPriorityType;
  creationDate: Date;
  isCompleted: boolean;
  columnId: string;
  team?: string[];
  description?: string;
  completionDate?: Date;
}
export interface IColumnFullKanban extends Omit<IColumn, "tasks"> {
  tasks: ITaskFullKanban[];
}
export interface IFullKanban extends Omit<IKanban, "columns"> {
  columns: IColumnFullKanban[];
}

interface IKanbanContext {
  // States
  kanbanList: IKanban[];
  authorizedKanbanList: IAuthorizedKanban[];
  selectedKanban: IFullKanban | null;

  // Dispatch
  setSelectedKanban: Dispatch<SetStateAction<IFullKanban | null>>;

  // Crud
  selectKanban: (id: string) => Promise<number | undefined>;
  createKanban: (title: string) => Promise<IKanban>;
  renameKanban: (title: string) => void;
  deleteKanban: (id: string) => void;

  addUserToKanban: (userId: string) => void;
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

  const [selectedKanban, setSelectedKanban] = useState<IFullKanban | null>(
    null
  );

  const { user } = useContext(AuthContext);
  const { socketKanban } = useContext(SocketContext);

  const pathname = usePathname();

  const kanbanFetcher = new Fetcher("kanban");

  // WebSocket
  useEffect(() => {
    if (!socketKanban) return;
    const updateKanbanList = () => {
      socketKanban.emit("getKanbans");
      socketKanban.emit("getAuthorizedKanbans");
    };
    const updateSelectedKanban = () => {
      socketKanban.emit("getSpecificKanbanFull", selectedKanban?.id);
    };

    socketKanban.emit("getKanbans");
    socketKanban.emit("getAuthorizedKanbans");

    socketKanban.on("kanbanListFetched", (data: IKanban[]) => {
      setKanbanList(data);
    });

    socketKanban.on(
      "authorizedKanbanListFetched",
      (data: IAuthorizedKanban[]) => {
        setAuthorizedKanbanList(data);
      }
    );

    socketKanban.on("selectedKanban", (kanban: IFullKanban) => {
      if (!kanban) redirect("/");
      if (user) {
        if (kanban.userId === user?.id) {
          setSelectedKanban(kanban);
          socketKanban.emit("joinKanban", kanban.id);
        } else if (
          kanban.authorizedUsers.some((authUser) =>
            authUser.userId.includes(user.id!)
          )
        ) {
          setSelectedKanban(kanban);
          socketKanban.emit("joinKanban", kanban.id);
        } else {
          setSelectedKanban(null);
          redirect("/");
        }
      }
    });

    socketKanban.on("updatedKanban", (updatedKanban: IFullKanban) => {
      setSelectedKanban(updatedKanban);
      updateKanbanList();
    });

    socketKanban.on("deletedKanban", () => {
      updateKanbanList();
      setSelectedKanban(null);
      redirect("/");
    });

    socketKanban.on("columnCreated", () => {
      updateSelectedKanban();
    });

    socketKanban.on("columnUpdated", () => {
      updateSelectedKanban();
    });

    socketKanban.on("columnRenamed", () => {
      updateSelectedKanban();
    });

    socketKanban.on("columnDeleted", () => {
      updateSelectedKanban();
    });

    socketKanban.on("kanbanTaskCreated", () => {
      updateSelectedKanban();
    });

    socketKanban.on("kanbanTaskUpdated", () => {
      updateSelectedKanban();
    });

    socketKanban.on("kanbanTaskDeleted", () => {
      updateSelectedKanban();
    });

    socketKanban.on("kanbanTaskMoved", () => {
      updateSelectedKanban();
    });

    socketKanban.on("kanbanTaskCompleted", () => {
      updateSelectedKanban();
    });

    socketKanban.on("userAdded", () => {
      socketKanban.emit("getAuthorizedKanbans");
      updateSelectedKanban();
    });

    socketKanban.on("userRemoved", () => {
      socketKanban.emit("getAuthorizedKanbans");
      updateSelectedKanban();
    });

    socketKanban.on("userRoleChanged", () => {
      updateSelectedKanban();
    });

    return () => {
      socketKanban.off("kanbanListFetched");
      socketKanban.off("authorizedKanbanListFetched");
      socketKanban.off("updatedKanban");
      socketKanban.off("selectedKanban");
      socketKanban.off("deletedKanban");
      socketKanban.off("columnCreated");
      socketKanban.off("columnUpdated");
      socketKanban.off("columnRenamed");
      socketKanban.off("columnDeleted");
      socketKanban.off("kanbanTaskCreated");
      socketKanban.off("kanbanTaskUpdated");
      socketKanban.off("kanbanTaskDeleted");
      socketKanban.off("kanbanTaskMoved");
      socketKanban.off("kanbanTaskCompleted");
      socketKanban.off("userAdded");
      socketKanban.off("userRemoved");
      socketKanban.off("userRoleChanged");
    };
  }, [socketKanban, user, pathname, selectedKanban]);

  const selectKanban = async (id: string) => {
    if (!socketKanban) return;
    if (selectedKanban?.id === id) return 0;
    socketKanban.emit("getSpecificKanbanFull", id);
  };
  const createKanban = async (title: string): Promise<IKanban> => {
    const createdKanban = (await kanbanFetcher.post<{ title: string }, IKanban>(
      { title }
    )) as IKanban;

    if (createdKanban) setKanbanList([...kanbanList, createdKanban]);

    return createdKanban;
  };

  const renameKanban = async (title: string) => {
    if (!selectedKanban) return;
    if (!socketKanban) return;
    socketKanban.emit("renameKanban", { id: selectedKanban.id, title });
  };

  const deleteKanban = async (id: string) => {
    if (!socketKanban) return;
    socketKanban.emit("deleteKanban", id);
  };

  const addUserToKanban = async (userId: string) => {
    if (!socketKanban) return;
    if (!selectedKanban) return;
    socketKanban.emit("addUserToKanban", {
      userId,
      kanbanId: selectedKanban.id,
    });
  };

  const removeUserFromKanban = async (userId: string) => {
    if (!socketKanban) return;
    if (!selectedKanban) return;
    socketKanban.emit("removeUserFromKanban", {
      userId,
      kanbanId: selectedKanban.id,
    });
  };

  const changeUserRole = async (userId: string, role: RoleType) => {
    if (!socketKanban) return;
    if (!selectedKanban) return;
    socketKanban.emit("changeUserRole", {
      userId,
      kanbanId: selectedKanban.id,
      role,
    });
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
