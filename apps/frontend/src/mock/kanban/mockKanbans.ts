export type UserPermissionType = "read" | "write" | "admin";

export interface IUser {
  email: string;
  status: UserPermissionType;
}

export interface IKanban {
  id: string;
  title: string;
  columnsId: string[];
userId: string;
  autorizedUsers: IUser[];
  creator: string;
}

const mockKanbanList: IKanban[] = [
  {
    id: "1234567890abcdef",
    title: "Estudos",
    columnsId: ["colqk12", "kbl127k", "fa6nlxq"],
userId: "123",
    autorizedUsers: [],
    creator: "",
  },
  {
    id: "1234567890ghijkl",
    title: "Trabalho",
    columnsId: [],
userId: "456",
    autorizedUsers: [],
    creator: "",
  },
  {
    id: "1234567890mnopqr",
    title: "Kanban 3",
    columnsId: [],
userId: "456",
    autorizedUsers: [],
    creator: "",
  },
];

export default mockKanbanList;
