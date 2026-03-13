import { create } from "zustand";
import { Fetcher } from "@/classes/Fetcher";
import { ITag } from "@/mock/mockTagList";

interface ITagData {
  list: ITag[];
  fetched: boolean;
  error?: boolean;
}

interface INoteTagStore {
  tagData: ITagData;
  getTags: () => void;
  createTag: (tagName: string) => void;
  deleteTag: (id: string) => void;
}

const fetcher = new Fetcher("tag");

export const useNoteTagStore = create<INoteTagStore>((set, get) => ({
  tagData: { list: [], fetched: false },
  getTags: async () => {
    if (get().tagData.fetched) return;
    const res = await fetcher.get<ITag[]>();

    if (!res) {
      set({ tagData: { list: [], fetched: true, error: true } });
      return;
    }

    set({ tagData: { list: res, fetched: true, error: false } });
  },
  createTag: async (tagName) => {
    const createdTag = await fetcher.post<{ tagName: string }, ITag>({
      tagName,
    });
    if (!createdTag) return;

    set({
      tagData: {
        ...get().tagData,
        list: [...get().tagData.list, createdTag],
      },
    });
  },
  deleteTag: async (id) => {
    const deletedTag = await fetcher.delete({ id });
    if (!deletedTag) return;

    set({
      tagData: {
        ...get().tagData,
        list: get().tagData.list.filter((tag) => tag.id !== id),
      },
    });

    return id;
  },
}));
