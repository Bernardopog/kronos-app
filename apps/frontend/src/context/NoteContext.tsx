"use client";

import { INote, mockNoteList } from "@/mock/mockNote";
import { createContext, ReactNode, useState } from "react";

interface INoteContext {
  noteList: INote[];
  selectedNote: INote | null;
  selectNote: (note: INote) => void;
}

const NoteContext = createContext({} as INoteContext);

const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [noteList, setNoteList] = useState<INote[]>(mockNoteList);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const selectNote = (note: INote) => {
    setSelectedNote(note);
  };

  return (
    <NoteContext.Provider
      value={{
        noteList,
        selectedNote,
        selectNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
