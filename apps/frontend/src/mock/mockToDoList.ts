import { mockCategoryList } from "./mockCategoryList";

export type PriorityType = "0" | "1" | "2" | "3" | "4" | "5";

export interface IToDoTask {
  id: string;
  title: string;
  description?: string;
  priority: PriorityType;
  creationDate: Date;
  isCompleted: boolean;
  category: string | null;
  userId: string;
}

export const mockToDoList: IToDoTask[] = [
  {
    id: "ba9f2",
    title: "Estudar Matemática",
    description: "Estudar Baskara",
    priority: "5",
    creationDate: new Date(2024, 11, 5),
    isCompleted: false,
    category: mockCategoryList[0].id,
    userId: "123",
  },
  {
    id: "k8a93",
    title: "Estudar Português",
    priority: "1",
    creationDate: new Date(2024, 10, 26),
    isCompleted: true,
    category: mockCategoryList[0].id,
    userId: "123",
  },
  {
    id: "hh192",
    title: "Aniversário Jane Doe",
    description: "Jane Doe faz aniversário no dia 25 de fevereiro",
    priority: "2",
    creationDate: new Date(2024, 2, 1),
    isCompleted: false,
    category: mockCategoryList[1].id,
    userId: "456",
  },
];
