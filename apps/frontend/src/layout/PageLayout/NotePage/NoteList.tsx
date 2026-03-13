"use client";
import NoteListItem from "@/components/NotePage/NoteListItem";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NoteFilter } from "./";
import NoteFilterOptions from "@/components/NotePage/NoteListOptions";
import { TabCloseButton } from "@/ui/Button";
import { DeviceScreenContext } from "@/context/DeviceScreenContext";
import Inert from "@/ui/Inert";
import { useNoteStore } from "@/store/NoteStore";
import { useShallow } from "zustand/shallow";
import { useNoteFilterStore } from "@/store/NoteFilterStore";
import { useNoteListStore } from "@/store/NoteListStore";

export default function NoteList() {
  const { isListShowing, toggleList, listShowControl } = useNoteListStore(
    useShallow((s) => ({
      isListShowing: s.isListShowing,
      toggleList: s.toggleList,
      listShowControl: s.listShowControl,
    })),
  );

  const filter = useNoteFilterStore((s) => s.filter);
  const { favorite, tag } = filter;

  const { noteData, getNotes } = useNoteStore(
    useShallow((s) => ({
      noteData: s.noteData,
      getNotes: s.getNotes,
    })),
  );
  const { fetched, list: notes } = noteData;

  const { device } = useContext(DeviceScreenContext);

  const [isFilterShow, setIsFilterShow] = useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterShow(!isFilterShow);
  };

  const handleSelectItem = (noteId: string) => {
    toggleList("close");

    const storage = window.localStorage;
    storage.setItem("lastViewedNote", noteId);
  };

  useEffect(() => {
    if (fetched) return;
    getNotes();
  }, [fetched, getNotes]);

  return (
    <Inert
      style={`fixed top-0 z-10 size-full pt-4 scrollbar-thumb-woodsmoke-950 scrollbar-track-transparent bg-woodsmoke-100 ease-in-out duration-300 
        dark:bg-woodsmoke-925 dark:shadow-[0_0_24px] dark:shadow-woodsmoke-100/10 
        lg:static lg:static lg:p-0 lg:translate-x-0 lg:bg-woodsmoke-50 
        ${listShowControl ? "left-0" : "-left-full"}`}
      value={isListShowing || device === "desktop"}
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
        <ul className="grid grid-cols-2 max-h-[calc(100vh-9.5rem)] mt-8 p-2 pb-32 gap-2 overflow-y-auto scrollbar-base sm:grid-cols-3 lg:mt-4 lg:flex lg:flex-col lg:pb-2 lg:pt-4">
          {notes.length > 0 &&
            notes
              .filter((note) => {
                if (favorite === "all") return true;
                else if (favorite === "favorites")
                  return note.isFavorite === true;
                else return note.isFavorite === false;
              })
              .filter((note) => {
                if (tag === "all") return true;
                else return note.tags.includes(tag);
              })
              .map((note) => {
                return (
                  <NoteListItem
                    key={note.id}
                    data={note}
                    action={() => handleSelectItem(note.id)}
                  />
                );
              })}
        </ul>
      </section>
    </Inert>
  );
}
