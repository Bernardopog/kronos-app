"use client";

import { AiFillFilter, AiOutlineClose } from "react-icons/ai";
import CreateNoteButton from "../Button/CreateNoteButton";
import { useContext } from "react";
import { NoteContext } from "@/context/NoteContext";
import Button from "../Button/Button";

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
    <section className="relative h-16 p-2 pt-8 lg:mt-0">
      <Button
        extraStyles={{
          button: `
            absolute top-0 left-2 z-50 m-0.5 text-xl bg-woodsmoke-800 text-woodsmoke-100 duration-300 ease-in-out
            lg:left-auto lg:right-2
            ${isFilterShow ? "left-24 lg:top-4" : "left-2 lg:top-0"}
          `,
          icon: "text-lg",
        }}
        action={() => {
          toggleFilter();
        }}
        ariaLabel="Abrir filtro de notas"
        icon={isFilterShow ? <AiOutlineClose /> : <AiFillFilter />}
      />
      <CreateNoteButton
        action={() => {
          createNote();
        }}
      />
    </section>
  );
}
