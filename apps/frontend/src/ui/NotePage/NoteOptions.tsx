"use client";

import Button from "@/components/Button/Button";
import TabCloseButton from "@/components/Button/TabCloseButton";
import { ModalContext } from "@/context/ModalContext";
import { NoteContext } from "@/context/NoteContext";
import { useContext, useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillHeart,
  AiFillSetting,
  AiOutlineClose,
  AiOutlineDownload,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsFiletypeTxt } from "react-icons/bs";

export default function NoteOptions() {
  const { selectedNote, toggleFavorite, toggleOptions, optionsShowControl } =
    useContext(NoteContext);
  const { toggleModal } = useContext(ModalContext);

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      return () => URL.revokeObjectURL(url);
    }
  }, [url]);

  const handleDownload = () => {
    const text = selectedNote!.description!;
    const textBlob = new Blob([text], { type: "application/pdf" });
    const url = URL.createObjectURL(textBlob);
    setUrl(url);
  };

  return (
    <>
      {selectedNote && (
        <Button
          extraStyles={{
            button: `hidden fixed top-20 right-4 z-50 rounded-full bg-woodsmoke-200 
              dark:border dark:bg-woodsmoke-950 
              hover:border-woodsmoke-400
              lg:flex`,
            icon: `text-woodsmoke-950 dark:text-woodsmoke-50 ${!isMenuOpen && "ease-in-out duration-1000 hover:rotate-180"}`,
          }}
          action={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          ariaLabel="Abrir opções"
          icon={isMenuOpen ? <AiOutlineClose /> : <AiFillSetting />}
        />
      )}
      {selectedNote && (
        <aside
          className={`
          flex flex-col fixed top-0 size-full gap-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-transparent bg-woodsmoke-100 ease-in-out duration-300
          dark:bg-woodsmoke-925 dark:shadow-side dark:shadow-woodsmoke-100/10
          lg:static lg:translate-x-0 lg:bg-woodsmoke-50
          ${!selectedNote && "hidden"}
          ${optionsShowControl ? "-right-0" : "-right-full"}
          ${isMenuOpen ? "px-2 pt-4" : "closed px-0 pt-14"}
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
          <div className={`flex justify-between items-center`}>
            <Button
              extraStyles={{
                button: `relative text-woodsmoke-800
                dark:text-woodsmoke-200
                dark:hover:shadow-btn
                ${isMenuOpen ? "px-2" : "px-1"}
                ${selectedNote?.isFavorite ? "hover:bg-poppy-600 dark:hover:shadow-poppy-600/25" : "hover:bg-apple-600 dark:hover:shadow-apple-600/25"}`,
                label: `text-nowrap 
                ${isMenuOpen ? "inline" : "hidden"}
                `,
              }}
              ariaLabel={`${selectedNote?.isFavorite ? "Desfavoritar Nota" : "Favoritar Nota"}`}
              label={`${selectedNote?.isFavorite ? "Desfavoritar Nota" : "Favoritar Nota"}`}
              action={() => toggleFavorite(selectedNote?.id)}
              icon={
                selectedNote?.isFavorite ? <AiOutlineHeart /> : <AiFillHeart />
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <Button
              extraStyles={{
                button: `w-full px-2 text-woodsmoke-800
                dark:text-woodsmoke-200
                hover:bg-poppy-600
                dark:hover:shadow-btn dark:hover:shadow-poppy-600/25
                ${isMenuOpen ? "px-2" : "px-1"}`,
                label: `text-nowrap
                ${isMenuOpen ? "inline" : "hidden"}
                `,
              }}
              label={"Deletar Nota"}
              action={() => {
                toggleModal({
                  headerTitle: "Deletar Nota",
                  type: "delete",
                  content: "noteDelete",
                });
              }}
              icon={<AiFillDelete />}
            />
          </div>
          {(selectedNote.description?.length ?? 0) > 0 && isMenuOpen && (
            <div className="flex flex-col justify-center">
              <p className="text-sm text-woodsmoke-800 ease-in-out duration-300 dark:text-woodsmoke-300">
                Tamanho da Descrição:
              </p>
              <p
                className="
                  p-1 border rounded-lg text-center border-woodsmoke-300 text-woodsmoke-800 ease-in-out duration-300
                  dark:border-woodsmoke-800 dark:text-woodsmoke-300
                "
              >
                {selectedNote?.description?.length} /{" "}
                <span className="opacity-50">20000</span>
              </p>
            </div>
          )}
          <a
            className="
                btn-base px-2 text-woodsmoke-800
                dark:text-woodsmoke-200
                hover:bg-apple-600
                dark:hover:shadow-btn dark:hover:shadow-apple-600/25
              "
            href={url ?? "#"}
            download={`note-${selectedNote.title}.txt`}
            onClick={handleDownload}
            aria-label={isMenuOpen ? "" : "Baixar Nota"}
          >
            <span className="text-2xl">
              {isMenuOpen ? <BsFiletypeTxt /> : <AiOutlineDownload />}
            </span>
            <span className={`${isMenuOpen ? "inline" : "hidden"}`}>
              Baixar Nota
            </span>
          </a>
        </aside>
      )}
    </>
  );
}
