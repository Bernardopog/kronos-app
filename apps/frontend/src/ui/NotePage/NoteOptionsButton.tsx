"use client";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";
import { AiFillSetting } from "react-icons/ai";

export default function NoteOptionsButton() {
  const { toggleOptions, isOptionsShow, selectedNote } =
    useContext(NoteContext);

  return (
    <>
      {!isOptionsShow && selectedNote && (
        <button
          className="to-do-tabs-button right-0 rounded-l-xl"
          onClick={() => {
            toggleOptions("open");
          }}
          aria-label="Abrir opções da nota"
        >
          <AiFillSetting />
        </button>
      )}
    </>
  );
}
