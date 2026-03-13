"use client";
import { useContext, useEffect, useState } from "react";
import ModalFooter from "../../../ui/Modal/ModalFooter";
import { ModalContext } from "@/context/ModalContext";
import { useNoteTagStore } from "@/store/NoteTagStore";
import { useShallow } from "zustand/shallow";
import { useNoteStore } from "@/store/NoteStore";

export default function ModalDeleteTag() {
  const { tagData, deleteTag, getTags } = useNoteTagStore(
    useShallow((s) => ({
      tagData: s.tagData,
      deleteTag: s.deleteTag,
      getTags: s.getTags,
    })),
  );
  const { fetched, list: tags } = tagData;

  const { clearDeletedTags } = useNoteStore(
    useShallow((s) => ({
      clearDeletedTags: s.clearDeletedTags,
    })),
  );

  const { toggleModal } = useContext(ModalContext);

  const [tagToDelete, setTagToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (fetched) return;
    getTags();
  }, [fetched, getTags]);

  return (
    <>
      <div className="flex flex-col p-2 py-6 gap-y-4" aria-live="polite">
        {tagToDelete ? (
          <p className="text-woodsmoke-800 text-center dark:text-woodsmoke-100">
            Você tem certeza que deseja excluir a nota: <br />
            <span className="font-bold text-2xl text-woodsmoke-950 dark:text-woodsmoke-50">
              {tags.find((tag) => tag.id === tagToDelete)?.tagName}
            </span>
          </p>
        ) : (
          <p className="text-woodsmoke-800 text-center dark:text-woodsmoke-100">
            Por favor selecione a Tag que você deseja remover...
          </p>
        )}
        <ul
          className={`grid grid-cols-4 rounded-lg gap-2 border-woodsmoke-200 dark:border-woodsmoke-800 ease-in-out duration-300 ${true ? "h-24 p-2 border overflow-y-auto scrollbar-base" : "h-0 overflow-clip p-0 border-none"}`}
        >
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="btn-base text-woodsmoke-950 cursor-pointer
              dark:text-woodsmoke-100
              hover:bg-poppy-600
              dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-poppy-600/25
                "
              onClick={() => {
                setTagToDelete(tag.id);
              }}
            >
              {tag.tagName}
            </li>
          ))}
        </ul>
        <p className="text-woodsmoke-800 text-center dark:text-woodsmoke-100">
          Cuidado, essa ação é{" "}
          <span className="inline-block px-2 rounded-full font-bold text-poppy-600 bg-woodsmoke-100 dark:bg-woodsmoke-950">
            irreversível !
          </span>
        </p>
      </div>
      <ModalFooter
        type="delete"
        action={() => {
          if (!tagToDelete) return;
          deleteTag(tagToDelete);
          clearDeletedTags(tagToDelete);
          toggleModal(null);
        }}
      />
    </>
  );
}
