import { Fetcher } from "@/classes/Fetcher";
import { IconsTypes } from "@/icons/icons";
import { INote } from "@/mock/mockNote";
import { create } from "zustand";

interface INoteData {
  list: INote[];
  fetched: boolean;
  error?: boolean;
}

interface INoteStore {
  noteData: INoteData;
  selectedNote: INote | null;

  getNotes: () => void;
  selectNote: (note: INote | null) => void;
  createNote: () => void;
  deleteNote: (id: string) => void;
  renameNote: (title: string) => void;
  changeNoteIcon: (icon: IconsTypes) => void;
  changeNoteContent: (content: string) => void;
  addTag: (tagId: string) => void;
  removeTag: (tagId: string) => void;
  toggleFavorite: (id: string) => void;
  clearDeletedTags: (tagId: string) => void;
}

const fetcher = new Fetcher("note");

export const useNoteStore = create<INoteStore>((set, get) => ({
  noteData: { list: [], fetched: false },
  selectedNote: null,

  getNotes: async () => {
    if (get().noteData.fetched) return;

    const res = await fetcher.get<INote[]>();

    if (!res) {
      set({ noteData: { list: [], fetched: true, error: true } });
      return;
    }

    set({ noteData: { list: res, fetched: true, error: false } });
  },

  selectNote: async (note) => {
    if (note === null) {
      set({ selectedNote: null });
      return;
    }

    const selectedNote = await fetcher.get<INote>({ id: note.id });

    if (!selectedNote) return;

    set({
      selectedNote: {
        ...selectedNote,
        creationDate: new Date(selectedNote.creationDate),
        updateDate: selectedNote.updateDate
          ? new Date(selectedNote.updateDate)
          : undefined,
      },
    });
  },

  createNote: async () => {
    const createdNote = await fetcher.post<Partial<INote>, INote>();

    if (!createdNote) return;

    set({
      noteData: {
        ...get().noteData,
        list: [...get().noteData.list, createdNote],
      },
      selectedNote: {
        ...createdNote,
        creationDate: new Date(createdNote.creationDate),
      },
    });
  },

  deleteNote: async (id) => {
    const deletedNote = await fetcher.delete({ id });

    if (!deletedNote) return;

    set({
      selectedNote: null,
      noteData: {
        ...get().noteData,
        list: get().noteData.list.filter((note) => note.id !== id),
      },
    });
  },

  renameNote: async (title) => {
    const updatedNote = await fetcher.patch<Partial<INote>, INote>(
      { title },
      { id: get().selectedNote!.id, endpoint: "rename" },
    );

    if (!updatedNote) return;

    set({
      selectedNote: { ...get().selectedNote!, title },
      noteData: {
        ...get().noteData,
        list: get().noteData.list.map((note) => {
          if (note.id === get().selectedNote?.id) note.title = title;
          return note;
        }),
      },
    });
  },

  changeNoteIcon: async (icon) => {
    const updatedNote = await fetcher.patch<Partial<INote>, INote>(
      { icon },
      { id: get().selectedNote!.id, endpoint: "icon" },
    );

    if (!updatedNote) return;

    set({
      selectedNote: { ...get().selectedNote!, icon },
      noteData: {
        ...get().noteData,
        list: get().noteData.list.map((note) => {
          if (note.id === get().selectedNote?.id) note.icon = icon;
          return note;
        }),
      },
    });
  },

  changeNoteContent: async (content) => {
    const updatedNote = await fetcher.patch<{ content: string }, INote>(
      { content },
      { id: get().selectedNote!.id, endpoint: "content" },
    );

    if (!updatedNote) return;

    set({
      selectedNote: {
        ...updatedNote,
        creationDate: new Date(updatedNote.creationDate),
        updateDate: updatedNote.updateDate
          ? new Date(updatedNote.updateDate)
          : undefined,
      },
      noteData: {
        ...get().noteData,
        list: get().noteData.list.map((note) =>
          note.id === get().selectedNote?.id
            ? ({
                ...updatedNote,
                creationDate: new Date(updatedNote.creationDate),
                updateDate: updatedNote.updateDate
                  ? new Date(updatedNote.updateDate)
                  : undefined,
              } as INote)
            : note,
        ),
      },
    });
  },

  addTag: async (tagId) => {
    const addedTag = await fetcher.post(
      { noteId: get().selectedNote!.id, tagId },
      { endpoint: "tag" },
    );

    if (!addedTag) return;

    set((state) => ({
      selectedNote: {
        ...state.selectedNote!,
        tags: [...state.selectedNote!.tags, tagId],
        creationDate: new Date(state.selectedNote!.creationDate),
        updateDate: state.selectedNote!.updateDate
          ? new Date(state.selectedNote!.updateDate)
          : undefined,
      },
      noteData: {
        ...state.noteData,
        list: state.noteData.list.map((note) => {
          if (note.id === state.selectedNote?.id) note.tags.push(tagId);
          return note;
        }),
      },
    }));
  },

  removeTag: async (tagId) => {
    const removedTag = await fetcher.delete(
      { noteId: get().selectedNote!.id, tagId },
      { endpoint: "tag" },
    );

    if (!removedTag) return;

    set((state) => ({
      selectedNote: {
        ...state.selectedNote!,
        tags: state.selectedNote!.tags.filter((tag) => tag !== tagId),
        creationDate: new Date(state.selectedNote!.creationDate),
        updateDate: state.selectedNote!.updateDate
          ? new Date(state.selectedNote!.updateDate)
          : undefined,
      },
      noteData: {
        ...state.noteData,
        list: state.noteData.list.map((note) => {
          if (note.id === state.selectedNote?.id)
            note.tags = note.tags.filter((tag) => tag !== tagId);
          return note;
        }),
      },
    }));
  },
  toggleFavorite: async (id) => {
    await fetcher.patch({ endpoint: "favorite", id });

    const updatedNoteList = get().noteData.list.map((note) => {
      if (note.id === id) note.isFavorite = !note.isFavorite;
      return note;
    });

    set({
      noteData: { ...get().noteData, list: updatedNoteList },
      selectedNote: {
        ...get().selectedNote!,
        isFavorite: !get().selectedNote!.isFavorite,
      },
    });
  },
  clearDeletedTags: (tagId) => {
    set((state) => ({
      selectedNote: {
        ...state.selectedNote!,
        tags: state.selectedNote!.tags.filter((tag) => tag !== tagId),
        creationDate: new Date(state.selectedNote!.creationDate),
        updateDate: state.selectedNote!.updateDate
          ? new Date(state.selectedNote!.updateDate)
          : undefined,
      },
      noteData: {
        ...state.noteData,
        list: state.noteData.list.map((note) => {
          if (note.id === state.selectedNote?.id)
            note.tags = note.tags.filter((tag) => tag !== tagId);
          return note;
        }),
      },
    }));
  },
}));
