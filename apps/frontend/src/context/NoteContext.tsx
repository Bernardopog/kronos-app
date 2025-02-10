"use client";

import { INote, mockNoteList } from "@/mock/mockNote";
import IdGenerator from "@/mod/IdGenerator";
import { createContext, ReactNode, useState } from "react";

interface INoteContext {
  noteList: INote[];
  selectedNote: INote | null;
  selectNote: (note: INote) => void;
  createNote: () => void;
}

const NoteContext = createContext({} as INoteContext);

const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [noteList, setNoteList] = useState<INote[]>(mockNoteList);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const selectNote = (note: INote) => {
    setSelectedNote(note);
  };

  const createNote = () => {
    const newNote: INote = {
      id: new IdGenerator(8).id,
      title: "Nova Nota",
      isFavorite: false,
      date: {
        createDate: new Date(),
      },
      description: "",
      tags: [],
    };
    setNoteList([...noteList, newNote]);
  };

  return (
    <NoteContext.Provider
      value={{
        noteList,
        selectedNote,
        selectNote,
        createNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
