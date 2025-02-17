"use client";

import Button from "@/components/Button/Button";
import { NoteContext } from "@/context/NoteContext";
import { useContext, useState } from "react";
import {
  AiFillHeart,
  AiFillSetting,
  // AiFillSetting,
  AiOutlineClose,
  AiOutlineHeart,
} from "react-icons/ai";

export default function NoteOptions() {
  const {
    selectedNote,
    toggleFavorite,
    isOptionsShow,
    toggleOptions,
    optionsShowControl,
  } = useContext(NoteContext);

  const [toggleOptionMenuDesktop, setToggleOptionMenuDesktop] = useState(false);

  return (
    <>
      <>
        {selectedNote && (
          <Button
            extraStyles={{
              button: `hidden fixed top-20 right-4 z-50 bg-woodsmoke-200 dark:border dark:border-woodsmoke-800 dark:bg-woodsmoke-950 lg:flex 
            ${!isOptionsShow && "hover:rotate-90 ease-in-out duration-500"}`,
              icon: "text-woodsmoke-950 dark:text-woodsmoke-50",
            }}
            action={() => {
              setToggleOptionMenuDesktop(!toggleOptionMenuDesktop);
            }}
            ariaLabel="Abrir opções"
          >
            {isOptionsShow ? <AiOutlineClose /> : <AiFillSetting />}
          </Button>
        )}
        <aside
          className={`
            absolute top-0 pt-4 size-full overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-transparent bg-woodsmoke-200 ease-in-out duration-300
            dark:bg-woodsmoke-925 dark:shadow-side dark:shadow-woodsmoke-100/10
            lg:static lg:translate-x-0 lg:bg-woodsmoke-50
            ${!selectedNote && "hidden"}
            ${optionsShowControl ? "-right-0" : "-right-full"}
            ${toggleOptionMenuDesktop && "closed"}
          `}
          id="nt-options"
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
              toggleOptions("close");
            }}
            aria-label="Fechar lista de notas"
          >
            <AiOutlineClose />
          </button>
          <div className="flex justify-between items-center p-2">
            <Button
              extraStyles={{
                button: `w-auto px-2 gap-x-2 rounded-lg
                    ${selectedNote?.isFavorite ? "bg-poppy-600" : "bg-apple-600"}
                    `,
                label: "text-nowrap text-woodsmoke-100",
              }}
              ariaLabel={`${selectedNote?.isFavorite ? "Desfavoritar Nota" : "Favoritar Nota"}`}
              label={`${selectedNote?.isFavorite ? "Desfavoritar Nota" : "Favoritar Nota"}`}
              action={toggleFavorite}
            >
              <span className="text-woodsmoke-100">
                {selectedNote?.isFavorite ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart />
                )}
              </span>
            </Button>
          </div>
        </aside>
      </>
    </>
  );
}
