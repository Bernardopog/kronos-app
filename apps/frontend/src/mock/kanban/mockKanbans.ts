export type RoleType = "admin" | "write" | "read";

export interface IAuthorizedUser {
  id: string;
  role: RoleType;
}

export interface IKanban {
  id: string;
  title: string;
  columnsId: string[];
  userId: string;
  authorizedUserId: IAuthorizedUser[];
}

const mockKanbanList: IKanban[] = [
  {
    id: "1234567890abcdef",
    title: "Estudos",
    columnsId: ["colqk12", "kbl127k", "fa6nlxq"],
    userId: "123",
    authorizedUserId: [
      { id: "456", role: "write" },
      { id: "789", role: "read" },
    ],
  },
  {
    id: "1234567890ghijkl",
    title: "Trabalho",
    columnsId: [],
    userId: "456",
    authorizedUserId: [],
  },
  {
    id: "1234567890mnopqr",
    title: "Kanban 3",
    columnsId: [],
    userId: "456",
    authorizedUserId: [],
  },
];

export default mockKanbanList;
