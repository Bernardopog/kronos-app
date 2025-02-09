"use client";
import CreateNoteButton from "@/components/Button/CreateNoteButton";
import NoteListItem from "@/components/NotePage/NoteListItem";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";

export default function NoteList() {
  const { noteList } = useContext(NoteContext);

  return (
    <section
      className="
        size-full overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-transparent bg-woodsmoke-50 ease-in-out duration-300
        dark:bg-woodsmoke-925
      "
      id="nt-list"
    >
      <ul className="flex flex-col p-2 gap-y-2">
        <li>
          <CreateNoteButton action={() => {}} />
        </li>
        {noteList.map((note) => {
          return <NoteListItem key={note.id} data={note} />;
        })}
      </ul>
    </section>
  );
}
