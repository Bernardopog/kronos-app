"use client";
import NoteListItem from "@/components/NotePage/NoteListItem";
import { NoteContext } from "@/context/NoteContext";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NoteFilter } from "./";
import NoteFilterOptions from "@/components/NotePage/NoteListOptions";
import { TabCloseButton } from "@/ui/Button";
import { DeviceScreenContext } from "@/context/DeviceScreenContext";
import Inert from "@/ui/Inert";

export default function NoteList() {
  const {
    noteList,
    isListShow,
    toggleList,
    listShowControl,
    filterTag,
    filterFavorite,
  } = useContext(NoteContext);

  const { device } = useContext(DeviceScreenContext);

  const [isFilterShow, setIsFilterShow] = useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterShow(!isFilterShow);
  };

  return (
    <Inert
      style={`fixed top-0 z-10 size-full pt-4 scrollbar-thumb-woodsmoke-950 scrollbar-track-transparent bg-woodsmoke-100 ease-in-out duration-300 
        dark:bg-woodsmoke-925 dark:shadow-side dark:shadow-woodsmoke-100/10 
        lg:static lg:static lg:p-0 lg:translate-x-0 lg:bg-woodsmoke-50 
        ${listShowControl ? "left-0" : "-left-full"}`}
      value={isListShow || device === "desktop"}
    >
      <section id="nt-list">
        <TabCloseButton
          action={() => toggleList("close")}
          icon={<AiOutlineClose />}
          ariaLabel="Fechar lista de notas"
        />
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
          {noteList.length > 0 && noteList
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
    </Inert>
  );
}
