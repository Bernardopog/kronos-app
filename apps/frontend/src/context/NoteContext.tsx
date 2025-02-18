"use client";

import { IconsTypes } from "@/icons/icons";
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
  isOptionsShow: boolean;
  optionsShowControl: boolean;
  selectNote: (note: INote) => void;
  createNote: () => void;
  updateNote: (updatedNote: INote) => void;
  toggleList: (type: "close" | "open") => void;
  toggleOptions: (type: "close" | "open") => void;
  addTag: (tagId: string) => void;
  removeTag: (tagId: string) => void;
  createTag: (tagName: string) => void;
  toggleFavorite: () => void;
  chooseIcon: (icon: IconsTypes) => void;
}

const NoteContext = createContext({} as INoteContext);

const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [noteList, setNoteList] = useState<INote[]>(mockNoteList);
  const [tagList, setTagList] = useState<ITag[]>(mockTagList);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const [isListShow, setIsListShow] = useState<boolean>(false);
  const [listShowControl, setListShowControl] = useState<boolean>(false);
  const [isOptionsShow, setIsOptionsShow] = useState<boolean>(false);
  const [optionsShowControl, setOptionsShowControl] = useState<boolean>(false);

  function findNote(): INote | undefined {
    const note = noteList.find((note) => note.id === selectedNote?.id);
    return note;
  }

  const toggleList = (type: "close" | "open") => {
    if (type === "open") {
      setIsListShow(true);
      setTimeout(() => setListShowControl(!listShowControl), 100);
    } else {
      setListShowControl(false);
      setTimeout(() => setIsListShow(false), 600);
    }
  };

  const toggleOptions = (type: "close" | "open") => {
    if (type === "open") {
      setIsOptionsShow(true);
      setTimeout(() => setOptionsShowControl(!optionsShowControl), 100);
    } else {
      setOptionsShowControl(!isOptionsShow);
      setTimeout(() => setIsOptionsShow(false), 600);
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
    setSelectedNote(newNote);
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
    const note = findNote();
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
    const note = findNote();
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

  const toggleFavorite = () => {
    const note = findNote();
    if (!note) return;

    const updatedNote: INote = {
      ...note,
      isFavorite: !note.isFavorite,
    };

    setSelectedNote(updatedNote);

    const newNoteList: INote[] = noteList.map((note) => {
      return note.id === selectedNote?.id ? (note = updatedNote) : note;
    });
    setNoteList(newNoteList);
  };

  const chooseIcon = (icon: IconsTypes) => {
    const note = findNote();
    if (!note) return;

    const updatedNote: INote = {
      ...note,
      icon: icon,
    };

    setSelectedNote(updatedNote);

    const newNoteList: INote[] = noteList.map((note) => {
      return note.id === selectedNote?.id ? (note = updatedNote) : note;
    });

    setNoteList(newNoteList);
  };

  return (
    <NoteContext.Provider
      value={{
        noteList,
        tagList,
        selectedNote,
        isListShow,
        listShowControl,
        isOptionsShow,
        optionsShowControl,
        selectNote,
        createNote,
        updateNote,
        toggleList,
        toggleOptions,
        addTag,
        removeTag,
        createTag,
        toggleFavorite,
        chooseIcon,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
