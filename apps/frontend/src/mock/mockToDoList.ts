import { mockCategoryList } from "./mockCategoryList";

export type PriorityType =
  | "level_0"
  | "level_1"
  | "level_2"
  | "level_3"
  | "level_4"
  | "level_5";

export interface IToDoTask {
  id: string;
  title: string;
  description?: string;
  priority: PriorityType;
  creationDate: Date;
  isCompleted: boolean;
  categoryId: string | null;
  userId: string;
}

export const mockToDoList: IToDoTask[] = [
  {
    id: "ba9f2",
    title: "Estudar Matemática",
    description: "Estudar Baskara",
    priority: "level_5",
    creationDate: new Date(2024, 11, 5),
    isCompleted: false,
    categoryId: mockCategoryList[0].id,
    userId: "123",
  },
  {
    id: "k8a93",
    title: "Estudar Português",
    priority: "level_1",
    creationDate: new Date(2024, 10, 26),
    isCompleted: true,
    categoryId: mockCategoryList[0].id,
    userId: "123",
  },
  {
    id: "hh192",
    title: "Aniversário Jane Doe",
    description: "Jane Doe faz aniversário no dia 25 de fevereiro",
    priority: "level_2",
    creationDate: new Date(2024, 2, 1),
    isCompleted: false,
    categoryId: mockCategoryList[1].id,
    userId: "456",
  },
];
