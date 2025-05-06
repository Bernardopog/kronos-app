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
import { Fetcher } from "@/classes/Fetcher";
import { SocketContext } from "./SocketContext";

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
  const { socketNote } = useContext(SocketContext);

  const noteFetcher = new Fetcher("note");
  const tagFetcher = new Fetcher("tag");

  // HTTP
  useEffect(() => {
    setSelectedNote(null);
    if (user) {
      const getData = async () => {
        const noteData = (await new Fetcher("note").get()) as INote[];
        setNoteList(noteData);
        const tagData = (await new Fetcher("tag").get()) as ITag[];
        setTagList(tagData);
      };
      getData();
    }
  }, [user]);

  // WebSocket
  useEffect(() => {
    if (!socketNote) return;

    socketNote.on("noteFavorited", (newNote: Partial<INote>) => {
      setNoteList(
        noteList.map((note) => {
          return note.id === newNote.id ? { ...note, ...newNote } : note;
        })
      );
      if (selectedNote?.id === newNote.id)
        setSelectedNote((prev) => ({ ...prev, ...newNote }) as INote);
    });

    socketNote.on("noteRenamed", (newNote: Partial<INote>) => {
      setNoteList(
        noteList.map((note) => {
          return note.id === newNote.id ? { ...note, ...newNote } : note;
        })
      );
      if (selectedNote?.id === newNote.id)
        setSelectedNote((prev) => ({ ...prev, ...newNote }) as INote);
    });
    socketNote.on("noteIconChanged", (newNote: Partial<INote>) => {
      setNoteList(
        noteList.map((note) => {
          return note.id === newNote.id ? { ...note, ...newNote } : note;
        })
      );
      if (selectedNote?.id === newNote.id)
        setSelectedNote((prev) => ({ ...prev, ...newNote }) as INote);
    });

    return () => {
      socketNote.off("noteFavorited");
      socketNote.off("noteRenamed");
      socketNote.off("noteIconChanged");
    };
  }, [socketNote, noteList, selectedNote]);

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
    const selectedNote = await noteFetcher.get<INote>({ id: note.id });

    if (selectedNote)
      setSelectedNote({
        ...selectedNote,
        creationDate: new Date(note.creationDate),
        updateDate: note.updateDate ? new Date(note.updateDate) : undefined,
      });
  };

  const createNote = async () => {
    const createdNote = (await noteFetcher.post()) as INote;

    if (createdNote) {
      setNoteList([...noteList, createdNote]);
      selectNote({
        ...createdNote,
        creationDate: new Date(createdNote.creationDate),
      });
    }
  };

  const deleteNote = async (id: string) => {
    const deletedNote = await noteFetcher.delete({ id });

    if (deletedNote) {
      setNoteList(noteList.filter((note) => note.id !== id));
      setSelectedNote(null);
    }
  };

  const toggleFavorite = async (id: string) => {
    if (!socketNote) return;
    socketNote.emit("favoriteNote", id);
  };

  const chooseIcon = async (icon: IconsTypes) => {
    if (!socketNote) return;
    socketNote.emit("changeIcon", { noteId: selectedNote!.id, icon });
  };

  const renameNote = async (title: string) => {
    if (!socketNote) return;
    socketNote.emit("renameNote", { noteId: selectedNote!.id, title });
  };

  const changeContent = async (content: string) => {
    const changedNote = await noteFetcher.patch<{ content: string }, INote>(
      { content },
      {
        id: selectedNote!.id,
        endpoint: "content",
      }
    );

    if (changedNote) {
      setSelectedNote({
        ...changedNote,
        creationDate: new Date(changedNote.creationDate),
        updateDate: changedNote.updateDate
          ? new Date(changedNote.updateDate)
          : undefined,
      } as INote);
      setNoteList(
        noteList.map((note) =>
          note.id === selectedNote?.id
            ? ({
                ...changedNote,
                creationDate: new Date(changedNote.creationDate),
                updateDate: changedNote.updateDate
                  ? new Date(changedNote.updateDate)
                  : undefined,
              } as INote)
            : note
        )
      );
    }
  };

  const addTag = async (tagId: string) => {
    const addedTag = await noteFetcher.post(
      { noteId: selectedNote!.id, tagId },
      { endpoint: "tag" }
    );

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
    const removedTag = await noteFetcher.delete(
      { noteId: selectedNote!.id, tagId },
      { endpoint: "tag" }
    );

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
    const createdTag = await tagFetcher.post<{ tagName: string }, ITag>({
      tagName,
    });

    if (createdTag) setTagList([...tagList, createdTag]);
  };

  const deleteTag = async (id: string) => {
    const deletedTag = await tagFetcher.delete({ id });

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
