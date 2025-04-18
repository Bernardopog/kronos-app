export type RoleType = "admin" | "write" | "read";

export interface IAuthorizedUser {
  userId: string;
  role: RoleType;
  user: { username: string; displayName: string | null };
}

export interface IKanban {
  id: string;
  title: string;
  columns: string[];
  userId: string;
  user: { username: string; displayName: string | null };
  authorizedUsers: IAuthorizedUser[];
}

const mockKanbanList: IKanban[] = [
  {
    id: "1234567890abcdef",
    title: "Estudos",
    columns: ["colqk12", "kbl127k", "fa6nlxq"],
    userId: "123",
    user: { displayName: "", username: "" },
    authorizedUsers: [
      { userId: "456", role: "write", user: { displayName: "", username: "" } },
      { userId: "789", role: "read", user: { displayName: "", username: "" } },
    ],
  },
  {
    id: "1234567890ghijkl",
    title: "Trabalho",
    columns: [],
    userId: "456",
    user: { displayName: "", username: "" },
    authorizedUsers: [],
  },
  {
    id: "1234567890mnopqr",
    title: "Kanban 3",
    columns: [],
    userId: "456",
    user: { displayName: "", username: "" },
    authorizedUsers: [],
  },
];

export default mockKanbanList;
