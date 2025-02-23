"use client";

import { AiFillFilter, AiOutlineClose } from "react-icons/ai";
import CreateNoteButton from "../Button/CreateNoteButton";
import { useContext } from "react";
import { NoteContext } from "@/context/NoteContext";

interface INoteListOptionsProps {
  isFilterShow: boolean;
  toggleFilter: () => void;
}

export default function NoteListOptions({
  isFilterShow,
  toggleFilter,
}: INoteListOptionsProps) {
  const { createNote } = useContext(NoteContext);

  return (
    <section className="relative h-16 mt-4 p-2 pt-8 lg:mt-0">
      <button
        className={`
            absolute top-0 left-2 z-50 m-0.5 p-1 rounded-lg text-xl bg-woodsmoke-800 text-woodsmoke-100 duration-300 ease-in-out
            lg:left-auto lg:right-2
            ${isFilterShow ? "left-24" : "left-2"}
          `}
        onClick={() => {
          toggleFilter();
        }}
        aria-label="Abrir filtro de notas"
      >
        {isFilterShow ? <AiOutlineClose /> : <AiFillFilter />}
      </button>
      <CreateNoteButton
        action={() => {
          createNote();
        }}
      />
    </section>
  );
}
