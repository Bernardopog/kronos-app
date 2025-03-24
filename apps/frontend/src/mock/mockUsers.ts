export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export const mockUserList: IUser[] = [
  {
    id: "123",
    username: "user1",
    email: "user1@email.com",
    password: "123",
    displayName: "John Doe",
  },
  {
    id: "456",
    username: "user2",
    email: "user2@email.com",
    password: "123",
    displayName: "Jane Doe",
  },
  {
    id: "789",
    username: "user3",
    email: "user3@email.com",
    password: "123",
  },
];
