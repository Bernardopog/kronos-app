export interface INote {
  id: string;
  title: string;
  description?: string;
  isFavorite: boolean;
  date: { createDate: Date; updateDate?: Date };
  tags?: string[];
}

export const mockNoteList: INote[] = [
  {
    id: "662sa",
    title: "Estudar React",
    description: "Estudar React, estudar sobre Context, Hooks, etc.",
    isFavorite: true,
    date: { createDate: new Date(2024, 11, 5) },
    tags: ["estudo", "react"],
  },

  {
    id: "8a3b5",
    title: "Estudar Vue",
    description: "Estudar Vue, estudar sobre Vuex, Composition API, etc.",
    isFavorite: false,
    date: { createDate: new Date(2024, 10, 2) },
    tags: ["estudo"],
  },
  {
    id: "l00pa",
    title: "Estudar Svelte",
    isFavorite: false,
    date: { createDate: new Date(2024, 9, 12) },
  },
];
