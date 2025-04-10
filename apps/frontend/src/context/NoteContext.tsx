"use client";

import { IconsTypes } from "@/icons/icons";
import { INote } from "@/mock/mockNote";
import { ITag } from "@/mock/mockTagList";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import {
  addTagToNoteFetch,
  changeNoteContentFetch,
  changeNoteIconFetch,
  createNoteFetch,
  createTagFetch,
  deleteNoteFetch,
  deleteTagFetch,
  favoriteNoteFetch,
  getNoteFetch,
  getSpecificNoteFetch,
  getTagsFetch,
  removeTagFromNoteFetch,
  renameNoteFetch,
} from "@/mod/fetchNote";

type FilterFavoriteType = "all" | "favorites" | "notFavorites";
type FilterTagType = "all" | string;

interface INoteContext {
  noteList: INote[];
  tagList: ITag[];
  selectedNote: INote | null;
  isListShow: boolean;
  listShowControl: boolean;
  isOptionsShow: boolean;
  optionsShowControl: boolean;
  filterFavorite: FilterFavoriteType;
  filterTag: FilterTagType;
  selectNote: (note: INote) => void;
  createNote: () => void;
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
  chooseIcon: (icon: IconsTypes) => void;
  renameNote: (title: string) => void;
  changeContent: (content: string) => void;
  toggleList: (type: "close" | "open") => void;
  toggleOptions: (type: "close" | "open") => void;
  addTag: (tagId: string) => void;
  removeTag: (tagId: string) => void;
  createTag: (tagName: string) => void;
  deleteTag: (id: string) => void;
  changeFilterFavorite: (type: FilterFavoriteType) => void;
  changeFilterTag: (type: FilterTagType) => void;
}

const NoteContext = createContext({} as INoteContext);

const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [noteList, setNoteList] = useState<INote[]>([]);
  const [tagList, setTagList] = useState<ITag[]>([]);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const [isListShow, setIsListShow] = useState<boolean>(false);
  const [listShowControl, setListShowControl] = useState<boolean>(false);
  const [isOptionsShow, setIsOptionsShow] = useState<boolean>(false);
  const [optionsShowControl, setOptionsShowControl] = useState<boolean>(false);

  const [filterFavorite, setFilterFavorite] =
    useState<FilterFavoriteType>("all");
  const [filterTag, setFilterTag] = useState<FilterTagType>("all");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setSelectedNote(null);

    const getData = async () => {
      const noteData = (await getNoteFetch()) as INote[];
      console.log(noteData);
      setNoteList(noteData);
      const tagData = (await getTagsFetch()) as ITag[];
      setTagList(tagData);
    };
    getData();
  }, [user]);

  function dateFormatter(field: string | null) {
    if (!field) return null;
    return new Date(field);
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

  const selectNote = async (note: INote) => {
    const selectedNote = await getSpecificNoteFetch(note.id);

    if (selectedNote)
      setSelectedNote({
        ...selectedNote,
        creationDate: new Date(note.creationDate),
        updateDate: note.updateDate ? new Date(note.updateDate) : undefined,
      });
  };

  const createNote = async () => {
    const createdNote = await createNoteFetch();

    if (createdNote) {
      setNoteList([...noteList, createdNote]);
      selectNote({
        ...createdNote,
        creationDate: new Date(createdNote.creationDate),
      });
    }
  };

  const deleteNote = async (id: string) => {
    const deletedNote = await deleteNoteFetch(id);

    if (deletedNote) {
      setNoteList(noteList.filter((note) => note.id !== id));
      setSelectedNote(null);
    }
  };

  const toggleFavorite = async (id: string) => {
    const favoritedNote = await favoriteNoteFetch(id);

    if (favoritedNote) {
      setNoteList(
        noteList.map((note) =>
          note.id === id
            ? ({
                ...favoritedNote,
                creationDate: dateFormatter(favoritedNote.creationDate),
                updateDate: dateFormatter(favoritedNote.updateDate),
              } as INote)
            : note
        )
      );
      setSelectedNote({
        ...favoritedNote,
        creationDate: dateFormatter(favoritedNote.creationDate),
        updateDate: dateFormatter(favoritedNote.updateDate),
      });
    }
  };

  const chooseIcon = async (icon: IconsTypes) => {
    const changedNote = await changeNoteIconFetch(selectedNote!.id, icon);

    if (changedNote) {
      setNoteList(
        noteList.map((note) =>
          note.id === selectedNote?.id
            ? ({
                ...changedNote,
                icon,
                creationDate: dateFormatter(changedNote.creationDate),
                updateDate: dateFormatter(changedNote.updateDate),
              } as INote)
            : note
        )
      );
      setSelectedNote({
        ...changedNote,
        icon,
        creationDate: dateFormatter(changedNote.creationDate),
        updateDate: dateFormatter(changedNote.updateDate),
      });
    }
  };

  const renameNote = async (title: string) => {
    const renamedNote = await renameNoteFetch(selectedNote!.id, title);

    if (renamedNote) {
      setSelectedNote({
        ...renamedNote,
        creationDate: dateFormatter(renamedNote.creationDate),
        updateDate: dateFormatter(renamedNote.updateDate),
      } as INote);
      setNoteList(
        noteList.map((note) =>
          note.id === selectedNote?.id
            ? {
                ...renamedNote,
                creationDate: dateFormatter(renamedNote.creationDate),
                updateDate: dateFormatter(renamedNote.updateDate),
              }
            : note
        )
      );
    }
  };

  const changeContent = async (content: string) => {
    const changedNote = await changeNoteContentFetch(selectedNote!.id, content);

    if (changedNote) {
      setSelectedNote({
        ...changedNote,
        creationDate: dateFormatter(changedNote.creationDate),
        updateDate: dateFormatter(changedNote.updateDate),
      } as INote);
      setNoteList(
        noteList.map((note) =>
          note.id === selectedNote?.id
            ? ({
                ...changedNote,
                creationDate: dateFormatter(changedNote.creationDate),
                updateDate: dateFormatter(changedNote.updateDate),
              } as INote)
            : note
        )
      );
    }
  };

  const addTag = async (tagId: string) => {
    const addedTag = await addTagToNoteFetch(selectedNote!.id, tagId);

    if (addedTag) {
      if (selectedNote?.id) {
        setSelectedNote({
          ...selectedNote,
          tags: [...selectedNote.tags, tagId],
          creationDate: new Date(selectedNote.creationDate),
          updateDate: selectedNote.updateDate
            ? new Date(selectedNote.updateDate)
            : undefined,
        });
      }

      const newNoteList: INote[] = noteList.map((note) => {
        return note.id === selectedNote?.id
          ? {
              ...selectedNote,
              tags: [...selectedNote.tags, tagId],
              creationDate: new Date(selectedNote.creationDate),
              updateDate: selectedNote.updateDate
                ? new Date(selectedNote.updateDate)
                : undefined,
            }
          : note;
      });
      setNoteList(newNoteList);
    }
  };

  const removeTag = async (tagId: string) => {
    const removedTag = await removeTagFromNoteFetch(selectedNote!.id, tagId);

    if (removedTag) {
      if (selectedNote?.id) {
        setSelectedNote({
          ...selectedNote,
          tags: selectedNote.tags.filter((tag) => tag !== tagId),
          creationDate: new Date(selectedNote.creationDate),
          updateDate: selectedNote.updateDate
            ? new Date(selectedNote.updateDate)
            : undefined,
        });
      }
    }
    const newNoteList: INote[] = noteList.map((note) => {
      return note.id === selectedNote?.id
        ? {
            ...selectedNote,
            tags: [...selectedNote.tags, tagId],
            creationDate: new Date(selectedNote.creationDate),
            updateDate: selectedNote.updateDate
              ? new Date(selectedNote.updateDate)
              : undefined,
          }
        : note;
    });
    setNoteList(newNoteList);
  };

  const createTag = async (tagName: string) => {
    const createdTag = await createTagFetch(tagName);

    if (createdTag) setTagList([...tagList, createdTag]);
  };

  const deleteTag = async (id: string) => {
    const deletedTag = await deleteTagFetch(id);

    if (deletedTag) {
      setTagList(tagList.filter((tag) => tag.id !== id));

      if (selectedNote)
        setSelectedNote({
          ...selectedNote,
          tags: selectedNote.tags.filter((tag) => tag !== id),
          creationDate: new Date(selectedNote.creationDate),
          updateDate: selectedNote.updateDate
            ? new Date(selectedNote.updateDate)
            : undefined,
        });
    }

    setNoteList(
      noteList.map((note) => {
        if (note.tags.includes(id)) {
          return {
            ...note,
            tags: note.tags.filter((tag) => {
              return tag !== id;
            }),
          };
        } else {
          return note;
        }
      })
    );
  };

  const changeFilterFavorite = (type: FilterFavoriteType) => {
    setFilterFavorite(type);
  };
  const changeFilterTag = (type: FilterTagType) => {
    setFilterTag(type);
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
        filterFavorite,
        filterTag,
        selectNote,
        createNote,
        deleteNote,
        toggleList,
        toggleOptions,
        addTag,
        removeTag,
        createTag,
        deleteTag,
        toggleFavorite,
        chooseIcon,
        renameNote,
        changeContent,
        changeFilterFavorite,
        changeFilterTag,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
