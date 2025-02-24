"use client";
import TabButton from "@/components/Button/TabButton";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

export default function NoteListButton() {
  const { toggleList, isListShow } = useContext(NoteContext);

  return (
    <>
      {!isListShow && (
        <TabButton
          action={() => {
            toggleList("open");
          }}
          ariaLabel="Abrir lista de notas"
          icon={<AiOutlineUnorderedList />}
          position="left"
        />
      )}
    </>
  );
}
