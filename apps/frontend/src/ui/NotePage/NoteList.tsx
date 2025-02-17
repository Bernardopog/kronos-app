"use client";
import CreateNoteButton from "@/components/Button/CreateNoteButton";
import NoteListItem from "@/components/NotePage/NoteListItem";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function NoteList() {
  const { noteList, createNote, isListShow, toggleList, listShowControl } =
    useContext(NoteContext);

  return (
    <section
      className={`
        fixed top-0 pt-4 size-full overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-transparent bg-woodsmoke-100 ease-in-out duration-300
        dark:bg-woodsmoke-925 dark:shadow-side dark:shadow-woodsmoke-100/10
        lg:static lg:translate-x-0 lg:bg-woodsmoke-50
        ${listShowControl ? "-left-0" : "-left-full"}
      `}
      id="nt-list"
      aria-hidden={!isListShow}
    >
      <button
        className="
          absolute right-8 z-50 flex items-center justify-center size-8 border rounded-full text-2xl border-woodsmoke-200 bg-woodsmoke-50 text-woodsmoke-950 duration-300 ease-in-out
          hover:bg-woodsmoke-100
          dark:bg-woodsmoke-900 dark:border-woodsmoke-600 dark:text-woodsmoke-50
          dark:hover:bg-woodsmoke-950
          lg:hidden
        "
        onClick={() => {
          toggleList("close");
        }}
        aria-label="Fechar lista de notas"
      >
        <AiOutlineClose />
      </button>
      <ul
        className="
        grid grid-cols-2 mt-8 p-2 pb-32 gap-2
        sm:grid-cols-3
        lg:mt-0 lg:flex lg:flex-col lg:pb-2
      "
      >
        <li>
          <CreateNoteButton
            action={() => {
              createNote();
            }}
          />
        </li>
        {noteList.map((note) => {
          return (
            <NoteListItem
              key={note.id}
              data={note}
              action={() => toggleList("close")}
            />
          );
        })}
      </ul>
    </section>
  );
}
