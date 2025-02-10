"use client";
import { NoteContext } from "@/context/NoteContext";
import { INote } from "@/mock/mockNote";
import { useContext } from "react";

interface INoteListItemProps {
  data: INote;
}

export default function NoteListItem({ data }: INoteListItemProps) {
  const { selectNote, selectedNote } = useContext(NoteContext);

  return (
    <li
      className={`
        min-h-20 rounded-lg border text-woodsmoke-925 cursor-pointer ease-in-out duration-300
        
        ${
          selectedNote?.id === data.id
            ? `bg-woodsmoke-300 border-woodsmoke-400 font-medium 
          dark:bg-woodsmoke-900 dark:border-woodsmoke-300 dark:text-woodsmoke-100`
            : `bg-woodsmoke-200 border-woodsmoke-300 
          dark:bg-woodsmoke-950 dark:border-woodsmoke-600 dark:text-woodsmoke-400`
        }
      `}
      onClick={() => {
        selectNote(data);
      }}
    >
      <h3 className="p-2">Note {data.title}</h3>
    </li>
  );
}
