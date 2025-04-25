"use client";

import NoteMainBody from "@/components/NotePage/NoteMainBody";
import NoteMainHeader from "@/components/NotePage/NoteMainHeader";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";

export default function NoteMain() {
  const { selectedNote } = useContext(NoteContext);

  return (
    <>
      {selectedNote ? (
        <article
          className="
            w-full h-[calc(100%)] bg-woodsmoke-100 text-woodsmoke-950 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-950 overflow-y-auto ease-in-out duration-300
            dark:bg-woodsmoke-950 dark:text-woodsmoke-200
          "
        >
          <NoteMainHeader selectedNote={selectedNote} />
          <NoteMainBody selectedNote={selectedNote} />
        </article>
      ) : (
        <p className="w-full mt-8 text-center italic text-2xl text-woodsmoke-950/50 dark:text-woodsmoke-300/50">
          Por favor selecione uma Nota...
        </p>
      )}
    </>
  );
}
