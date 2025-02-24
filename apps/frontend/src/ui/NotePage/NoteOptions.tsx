"use client";

import Button from "@/components/Button/Button";
import TabCloseButton from "@/components/Button/TabCloseButton";
import { NoteContext } from "@/context/NoteContext";
import { useContext, useState } from "react";
import {
  AiFillHeart,
  AiFillSetting,
  AiOutlineClose,
  AiOutlineHeart,
} from "react-icons/ai";

export default function NoteOptions() {
  const { selectedNote, toggleFavorite, toggleOptions, optionsShowControl } =
    useContext(NoteContext);

  const [toggleOptionMenuDesktop, setToggleOptionMenuDesktop] = useState(false);

  return (
    <>
      <>
        {selectedNote && (
          <Button
            extraStyles={{
              button: `hidden fixed top-20 right-4 z-50 rounded-full bg-woodsmoke-200 
                dark:border dark:bg-woodsmoke-950 
                hover:border-woodsmoke-400
                lg:flex`,
              icon: `text-woodsmoke-950 dark:text-woodsmoke-50 ${toggleOptionMenuDesktop && "ease-in-out duration-1000 hover:rotate-180"}`,
            }}
            action={() => {
              setToggleOptionMenuDesktop(!toggleOptionMenuDesktop);
            }}
            ariaLabel="Abrir opções"
            icon={
              !toggleOptionMenuDesktop ? <AiOutlineClose /> : <AiFillSetting />
            }
          />
        )}
        <aside
          className={`
            fixed top-0 pt-4 size-full overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-transparent bg-woodsmoke-100 ease-in-out duration-300
            dark:bg-woodsmoke-925 dark:shadow-side dark:shadow-woodsmoke-100/10
            lg:static lg:translate-x-0 lg:bg-woodsmoke-50
            ${!selectedNote && "hidden"}
            ${optionsShowControl ? "-right-0" : "-right-full"}
            ${toggleOptionMenuDesktop && "closed"}
          `}
          id="nt-options"
        >
          <TabCloseButton
            action={() => {
              toggleOptions("close");
            }}
            ariaLabel="Fechar opções da nota"
            icon={<AiOutlineClose />}
          />
          <div className="flex justify-between items-center p-2">
            <Button
              extraStyles={{
                button: `px-2 text-woodsmoke-800
                  dark:text-woodsmoke-200
                  dark:hover:shadow-btn
                  a
                  ${selectedNote?.isFavorite ? "hover:bg-poppy-600 dark:hover:shadow-poppy-600/25" : "hover:bg-apple-600 dark:hover:shadow-apple-600/25"}`,
                label: "text-nowrap",
              }}
              ariaLabel={`${selectedNote?.isFavorite ? "Desfavoritar Nota" : "Favoritar Nota"}`}
              label={`${selectedNote?.isFavorite ? "Desfavoritar Nota" : "Favoritar Nota"}`}
              action={toggleFavorite}
              icon={
                selectedNote?.isFavorite ? <AiOutlineHeart /> : <AiFillHeart />
              }
            />
          </div>
        </aside>
      </>
    </>
  );
}
