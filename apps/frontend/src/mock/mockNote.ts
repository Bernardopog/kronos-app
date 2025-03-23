import { IconsTypes } from "@/icons/icons";
import { mockTagList } from "./mockTagList";

export interface INote {
  id: string;
  title: string;
  description?: string;
  isFavorite: boolean;
  date: { createDate: Date; updateDate?: Date };
  tags: string[];
  icon?: IconsTypes;
  userId: string;
}

export const mockNoteList: INote[] = [
  {
    id: "662sa",
    title: "Estudar React",
    description: "Estudar React, estudar sobre Context, Hooks, etc.",
    isFavorite: true,
    date: { createDate: new Date(2024, 11, 5) },
    tags: [mockTagList[0].id, mockTagList[1].id],
    icon: "book",
    userId: "123",
  },
  {
    id: "8a3b5",
    title: "Estudar Vue",
    description: "Estudar Vue, estudar sobre Vuex, Composition API, etc.",
    isFavorite: false,
    date: { createDate: new Date(2024, 10, 2) },
    tags: [mockTagList[0].id],
    userId: "123",
  },
  {
    id: "l00pa",
    title: "Estudar Svelte",
    isFavorite: false,
    date: { createDate: new Date(2024, 9, 12) },
    tags: [],
    icon: "book",
    userId: "456",
  },
];
