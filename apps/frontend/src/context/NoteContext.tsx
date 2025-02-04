"use client";

import { INote, mockNoteList } from "@/mock/mockNote";
import { createContext, ReactNode, useState } from "react";

interface INoteContext {
  noteList: INote[];
}

const NoteContext = createContext({} as INoteContext);

const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [noteList, setNoteList] = useState<INote[]>(mockNoteList);

  return (
    <NoteContext.Provider
      value={{
        noteList,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
