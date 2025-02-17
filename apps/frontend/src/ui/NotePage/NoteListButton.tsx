"use client";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

export default function NoteListButton() {
  const { toggleList, isListShow } = useContext(NoteContext);

  return (
    <>
      {!isListShow && (
        <button
          className="to-do-tabs-button left-0 rounded-r-xl"
          onClick={() => {
            toggleList("open");
          }}
          aria-label="Abrir lista de notas"
        >
          <AiOutlineUnorderedList />
        </button>
      )}
    </>
  );
}
