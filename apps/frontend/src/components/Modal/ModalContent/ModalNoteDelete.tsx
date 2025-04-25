"use client";

import { ModalContext } from "@/context/ModalContext";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";
import ModalFooter from "../../../ui/Modal/ModalFooter";

export default function ModalNoteDelete() {
  const { deleteNote, selectedNote } = useContext(NoteContext);
  const { toggleModal } = useContext(ModalContext);

  return (
    <>
      <div
        className="flex flex-col py-4 px-2 gap-4 text-woodsmoke-950 dark:text-woodsmoke-100"
        aria-live="polite"
      >
        <p className="text-center">
          Você tem certeza que deseja excluir a nota: <br />
          <span className="font-bold text-2xl">{selectedNote?.title}</span>
        </p>
        <p className="text-center">
          Cuidado, essa ação é{" "}
          <span className="inline-block px-2 rounded-full font-bold text-poppy-600 bg-woodsmoke-100 dark:bg-woodsmoke-950">
            irreversível !
          </span>
        </p>
      </div>
      <ModalFooter
        type={"delete"}
        action={() => {
          toggleModal(null);
          deleteNote(selectedNote!.id);
        }}
      />
    </>
  );
}
