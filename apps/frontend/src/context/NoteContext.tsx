"use client";

import { INote, mockNoteList } from "@/mock/mockNote";
import { ITag, mockTagList } from "@/mock/mockTagList";
import IdGenerator from "@/mod/IdGenerator";
import { createContext, ReactNode, useState } from "react";

interface INoteContext {
  noteList: INote[];
  tagList: ITag[];
  selectedNote: INote | null;
  isListShow: boolean;
  listShowControl: boolean;
  selectNote: (note: INote) => void;
  createNote: () => void;
  updateNote: (updatedNote: INote) => void;
  toggleList: (type: "close" | "open") => void;
  addTag: (tagId: string) => void;
  removeTag: (tagId: string) => void;
  createTag: (tagName: string) => void;
}

const NoteContext = createContext({} as INoteContext);

const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [noteList, setNoteList] = useState<INote[]>(mockNoteList);
  const [tagList, setTagList] = useState<ITag[]>(mockTagList);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const [isListShow, setIsListShow] = useState<boolean>(false);
  const [listShowControl, setListShowControl] = useState<boolean>(false);

  const toggleList = (type: "close" | "open") => {
    if (type === "open") {
      setIsListShow(true);
      setTimeout(() => setListShowControl(!listShowControl), 100);
    } else {
      setListShowControl(!isListShow);
      setTimeout(() => setIsListShow(false), 600);
    }
  };

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

  const addTag = (tagId: string) => {
    const note = noteList.find((note) => note.id === selectedNote?.id);
    if (!note) return;
    const tagToAdd = tagList.find((tag) => tag.id === tagId);
    if (!tagToAdd) return;

    if (note.tags.find((tag) => tag.id === tagToAdd.id)) return;

    const updatedNote: INote = {
      ...note,
      tags: [...note.tags, tagToAdd],
    };

    setSelectedNote({ ...selectedNote, ...updatedNote });

    const newNoteList: INote[] = noteList.map((note) => {
      return note.id === selectedNote?.id ? (note = updatedNote) : note;
    });
    setNoteList(newNoteList);
  };

  const removeTag = (tagId: string) => {
    const note = noteList.find((note) => note.id === selectedNote?.id);
    if (!note) return;
    const tagToRemove = note.tags.find((tag) => tag.id === tagId);
    if (!tagToRemove) return;

    const updatedNote: INote = {
      ...note,
      tags: note.tags.filter((tag) => tag.id !== tagToRemove.id),
    };

    setSelectedNote({ ...selectedNote, ...updatedNote });

    const newNoteList: INote[] = noteList.map((note) => {
      return note.id === selectedNote?.id ? (note = updatedNote) : note;
    });
    setNoteList(newNoteList);
  };

  const createTag = (tagName: string) => {
    setTagList([...tagList, { id: new IdGenerator(8).id, tagName }]);
  };

  return (
    <NoteContext.Provider
      value={{
        noteList,
        tagList,
        selectedNote,
        isListShow,
        listShowControl,
        selectNote,
        createNote,
        updateNote,
        toggleList,
        addTag,
        removeTag,
        createTag,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
