"use client";
import { TabButton } from "@/ui/Button";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";
import { AiFillSetting } from "react-icons/ai";

export default function NoteOptionsButton() {
  const { toggleOptions, isOptionsShow, selectedNote } =
    useContext(NoteContext);

  return (
    <>
      {!isOptionsShow && selectedNote && (
        <TabButton
          action={() => {
            toggleOptions("open");
          }}
          ariaLabel="Abrir opções da nota"
          icon={<AiFillSetting />}
          position="right"
        />
      )}
    </>
  );
}
