export type UserPermissionType = "read" | "write" | "admin";

export interface IUser {
  email: string;
  status: UserPermissionType;
}

export interface IKanban {
  id: string;
  title: string;
  columnsId: string[];
  autorizedUsers: IUser[];
  creator: string;
}

const mockKanbanList: IKanban[] = [
  {
    id: "1234567890abcdef",
    title: "Estudos",
    columnsId: ["colqk12", "kbl127k", "fa6nlxq"],
    autorizedUsers: [],
    creator: "",
  },
  {
    id: "1234567890ghijkl",
    title: "Trabalho",
    columnsId: [],
    autorizedUsers: [],
    creator: "",
  },
  {
    id: "1234567890mnopqr",
    title: "Kanban 3",
    columnsId: [],
    autorizedUsers: [],
    creator: "",
  },
];

export default mockKanbanList;
