"use client";
import { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";
import { NoteContext } from "@/context/NoteContext";
import { ModalContext } from "@/context/ModalContext";

export default function ModalDeleteTag() {
  const { tagList, deleteTag } = useContext(NoteContext);
  const { toggleModal } = useContext(ModalContext);

  const [tagToDelete, setTagToDelete] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col p-2 py-6 gap-y-4">
        {tagToDelete ? (
          <p className="text-woodsmoke-800 text-center dark:text-woodsmoke-100">
            Você tem certeza que deseja excluir a nota: <br />
            <span className="font-bold text-2xl text-woodsmoke-950 dark:text-woodsmoke-50">
              {tagList.find((tag) => tag.id === tagToDelete)?.tagName}
            </span>
          </p>
        ) : (
          <p className="text-woodsmoke-800 text-center dark:text-woodsmoke-100">
            Por favor selecione a Tag que você deseja remover...
          </p>
        )}
        <ul
          className={`
          grid grid-cols-4 rounded-lg gap-2 border-woodsmoke-200 dark:border-woodsmoke-800 ease-in-out duration-300
          ${true ? "h-24 p-2 border overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-950" : "h-0 overflow-clip p-0 border-none"}
        `}
        >
          {tagList.map((tag) => (
            <li
              key={tag.id}
              className="btn-base text-woodsmoke-950 cursor-pointer
              dark:text-woodsmoke-100
              hover:bg-poppy-600
              dark:hover:shadow-btn dark:hover:shadow-poppy-600/25
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
          deleteTag(tagToDelete ?? "");
          toggleModal(null);
        }}
      />
    </>
  );
}
