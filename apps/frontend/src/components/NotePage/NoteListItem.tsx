"use client";
import { NoteContext } from "@/context/NoteContext";
import { icons } from "@/icons/icons";
import { INote } from "@/mock/mockNote";
import { useContext } from "react";
import { AiFillStar } from "react-icons/ai";

interface INoteListItemProps {
  data: INote;
  action: () => void;
}

export default function NoteListItem({ data, action }: INoteListItemProps) {
  const { selectNote, selectedNote } = useContext(NoteContext);

  return (
    <li
      tabIndex={0}
      role="button"
      aria-label={`Abrir nota ${data.title}`}
      className={`
        grid grid-cols-12 items-center relative min-h-12 px-2 rounded-lg border text-woodsmoke-925 cursor-pointer ease-in-out duration-300
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
        action();
      }}
    >
      {data && (
        <span className="col-span-1 text-xl">
          {icons[data.icon as keyof typeof icons]}
        </span>
      )}
      <h3 className="col-span-10 w-full p-2 text-sm truncate">{data.title}</h3>
      {data.isFavorite && (
        <span className="col-span-1 block size-auto text-xl">
          <AiFillStar />
        </span>
      )}
    </li>
  );
}
