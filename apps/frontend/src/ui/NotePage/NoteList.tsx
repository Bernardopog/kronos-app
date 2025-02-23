"use client";
import NoteListItem from "@/components/NotePage/NoteListItem";
import { NoteContext } from "@/context/NoteContext";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NoteFilter } from "./NoteFilter";
import NoteFilterOptions from "@/components/NotePage/NoteListOptions";

export default function NoteList() {
  const {
    noteList,
    isListShow,
    toggleList,
    listShowControl,
    filterTag,
    filterFavorite,
  } = useContext(NoteContext);

  const [isFilterShow, setIsFilterShow] = useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterShow(!isFilterShow);
  };

  return (
    <section
      className={`
        fixed top-0 z-10 size-full scrollbar-thumb-woodsmoke-950 scrollbar-track-transparent bg-woodsmoke-100 ease-in-out duration-300
        dark:bg-woodsmoke-925 dark:shadow-side dark:shadow-woodsmoke-100/10
        lg:static lg:translate-x-0 lg:bg-woodsmoke-50
        ${listShowControl ? "-left-0" : "-left-full"}
      `}
      id="nt-list"
      aria-hidden={!isListShow}
    >
      <button
        className="
          absolute top-2 right-8 z-50 flex items-center justify-center size-8 border rounded-full text-2xl border-woodsmoke-200 bg-woodsmoke-50 text-woodsmoke-950 duration-300 ease-in-out
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
      <NoteFilterOptions
        isFilterShow={isFilterShow}
        toggleFilter={toggleFilter}
      />
      <NoteFilter state={isFilterShow} />
      <ul
        className="
        grid grid-cols-2 max-h-[calc(100vh-9.5rem)] mt-8 p-2 pb-32 gap-2 overflow-y-auto scrollbar-thin
        sm:grid-cols-3
        lg:mt-4 lg:flex lg:flex-col lg:pb-2 lg:pt-4
      "
      >
        {noteList
          .filter((note) => {
            if (filterFavorite === "all") return true;
            else if (filterFavorite === "favorites")
              return note.isFavorite === true;
            else return note.isFavorite === false;
          })
          .filter((note) => {
            if (filterTag === "all") return true;
            else return note.tags.includes(filterTag);
          })
          .map((note) => {
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
