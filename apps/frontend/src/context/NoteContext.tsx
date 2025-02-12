"use client";

import { INote, mockNoteList } from "@/mock/mockNote";
import IdGenerator from "@/mod/IdGenerator";
import { createContext, ReactNode, useState } from "react";

interface INoteContext {
  noteList: INote[];
  selectedNote: INote | null;
  selectNote: (note: INote) => void;
  createNote: () => void;
  updateNote: (updatedNote: INote) => void;
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

  const updateNote = (updatedNote: INote) => {
    const updatedNoteData: INote = {
      ...updatedNote,
      date: {
        createDate: updatedNote.date.createDate,
        updateDate: new Date(),
      },
    };

    const newNoteList: INote[] = noteList.map((note) => {
      return note.id === updatedNote.id ? (note = updatedNoteData) : note;
    });

    setNoteList(newNoteList);

    const foundNote = newNoteList.find((note) => {
      return note.id === selectedNote?.id;
    });
    if (!foundNote) return;

    selectNote(foundNote);
  };

  return (
    <NoteContext.Provider
      value={{
        noteList,
        selectedNote,
        selectNote,
        createNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
