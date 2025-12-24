"use client";

import { AiFillTag, AiOutlineClockCircle, AiOutlineTag } from "react-icons/ai";
import { INote } from "@/mock/mockNote";
import Divider from "@/ui/Divider";
import { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import { NoteContext } from "@/context/NoteContext";
import { icons } from "@/icons/icons";
import { FaQuestion } from "react-icons/fa";
import { Button } from "@/ui/Button/";

import HyperTextModal from "../Modal/HyperTextModal/HyperTextModal";

interface INoteMainHeaderProps {
  selectedNote: INote;
}

export default function NoteMainHeader({ selectedNote }: INoteMainHeaderProps) {
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [editableTitle, setEditableTitle] = useState<boolean>(false);
  const [isIconListShow, setIsIconListShow] = useState<boolean>(false);
  const [isTagHelperOpen, setIsTagHelperOpen] = useState<boolean>(false);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const { renameNote, chooseIcon, tagList } = useContext(NoteContext);
  const { toggleModal } = useContext(ModalContext);

  const noteCreateDate = selectedNote?.creationDate;
  const noteUpdateDate = selectedNote?.updateDate;

  const icon = selectedNote.icon ? icons[selectedNote.icon] : null;

  useEffect(() => {
    if (editableTitle && titleInputRef.current) titleInputRef.current.focus();
    setNoteTitle(selectedNote?.title ?? "");
  }, [editableTitle, selectedNote]);

  return (
    <header className="px-4 pt-4">
      <div className="flex items-center relative gap-x-2">
        <Button
          extraStyles={{
            button: `p-1 border rounded-lg text-woodsmoke-800
              hover:text-woodsmoke-950 hover:border-woodsmoke-800
              dark:text-woodsmoke-200 dark:border-woodsmoke-600
              dark:hover:bg-woodsmoke-925 dark:hover:border-woodsmoke-600 dark:hover:text-woodsmoke-100
            ${selectedNote.icon ? "" : "size-10"}
          `,
            icon: "text-3xl",
          }}
          ariaLabel="Trocar icone da nota"
          action={() => setIsIconListShow(!isIconListShow)}
          icon={selectedNote.icon && icon}
        />
        {isIconListShow && (
          <ul
            className="
            grid grid-cols-6 gap-2 absolute top-12 p-2 border rounded-lg border-woodsmoke-300 bg-woodsmoke-200 
          dark:bg-woodsmoke-925 dark:border-woodsmoke-600
            sm:grid-cols-8
          "
          >
            {Object.keys(icons).map((iconkey) => {
              return (
                <li key={iconkey}>
                  <Button
                    extraStyles={{
                      button: `text-woodsmoke-600 ease-in-out duration-300
                        hover:text-woodsmoke-950 hover:shadow-[0_0_5px_3px] hover:shadow-woodsmoke-500/25
                        dark:text-woodsmoke-300                         dark:hover:text-woodsmoke-100
                      `,
                    }}
                    action={() => {
                      chooseIcon(iconkey as keyof typeof icons);
                      setIsIconListShow(false);
                    }}
                    icon={icons[iconkey as keyof typeof icons]}
                  />
                </li>
              );
            })}
          </ul>
        )}
        {editableTitle ? (
          <input
            className="
              w-full text-2xl bg-woodsmoke-100
              focus:pl-4 focus:outline focus:outline-woodsmoke-600 focus:rounded-lg ease-in-out duration-300
              dark:bg-woodsmoke-950 dark:focus:outline-woodsmoke-100
            "
            ref={titleInputRef}
            type="text"
            value={noteTitle}
            onChange={(ev) => {
              setNoteTitle(ev.target.value);
            }}
            onBlur={() => {
              renameNote(noteTitle);
              setEditableTitle(false);
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                renameNote(noteTitle);
                setEditableTitle(false);
              }
            }}
          />
        ) : (
          <h2
            className="text-2xl"
            onMouseUp={() => {
              setEditableTitle(true);
            }}
          >
            {selectedNote?.title}
          </h2>
        )}
      </div>
      <section
        className="
        flex flex-col items-start mt-12 gap-2 text-woodsmoke-900 dark:text-woodsmoke-300
        lg:flex-row
      "
      >
        <section className="flex items-start gap-x-2">
          <span className="text-xl md:text-2xl">
            <AiOutlineTag />
          </span>
          <p className="font-medium text-woodsmoke-800 dark:text-woodsmoke-200">
            Tags:
          </p>
          <ul className="flex flex-wrap gap-x-2">
            {selectedNote.tags?.map((tag, idx) => {
              return (
                <li key={tag}>
                  <p className="capitalize">
                    {tagList[tagList.findIndex((t) => t.id === tag)].tagName}
                    {idx === selectedNote.tags!.length - 1 ? "." : ","}
                  </p>
                </li>
              );
            })}
            {selectedNote.tags?.length === 0 && (
              <li>
                <p>Sem Tags</p>
              </li>
            )}
          </ul>
        </section>
        <Button
          extraStyles={{
            button: `min-w-fit px-2 border ml-4 font-medium
              hover:bg-woodsmoke-950 hover:text-woodsmoke-100
              darkhover:bg-woodsmoke-925 dark:hover:text-woodsmoke-100 dark:hover:border-woodsmoke-500
            `,
            icon: "text-base",
            label: "text-sm",
          }}
          action={() => {
            toggleModal({
              headerTitle: "Gerenciar Tags",
              type: "read",
              content: "noteReadTags",
            });
          }}
          icon={<AiFillTag />}
          label="Gerenciar Tags"
        />
      </section>
      <section className="flex items-center mt-2 gap-x-2 text-woodsmoke-900 dark:text-woodsmoke-300">
        <span className="text-xl md:text-2xl">
          <AiOutlineClockCircle />
        </span>
        <div className="flex gap-x-8">
          {noteCreateDate && (
            <p className="flex flex-col items-center w-full font-medium">
              <span className="text-woodsmoke-800 dark:text-woodsmoke-200 text-sm md:text-base">
                Data Criação:
              </span>
              <span className="font-normal inline-block ml-2 text-sm md:text-base">
                {noteCreateDate.getDate().toString().padStart(2, "0")} /{" "}
                {(noteCreateDate.getMonth() + 1).toString().padStart(2, "0")} /{" "}
                {noteCreateDate.getFullYear()}
              </span>
            </p>
          )}
          {noteUpdateDate && (
            <p className="flex flex-col items-center w-full font-medium">
              <span className="text-woodsmoke-800 dark:text-woodsmoke-200 text-sm md:text-base">
                Data Edição:
              </span>
              <span className="font-normal inline-block ml-2 text-sm md:text-base">
                {noteUpdateDate.getDate().toString().padStart(2, "0")} /{" "}
                {(noteUpdateDate.getMonth() + 1).toString().padStart(2, "0")} /{" "}
                {noteUpdateDate.getFullYear()}
              </span>
            </p>
          )}
        </div>
      </section>
      <div className="flex justify-end relative px-2">
        <Button
          ariaLabel="Ajuda Hipertexto"
          extraStyles={{
            button: `group opacity-25 
              hover:opacity-100 hover:bg-woodsmoke-950
              dark:hover:border-woodsmoke-800
            `,
            icon: "text-woodsmoke-950 group-hover:text-woodsmoke-50 dark:text-woodsmoke-100",
          }}
          action={() => {
            setIsTagHelperOpen(!isTagHelperOpen);
          }}
          icon={<FaQuestion />}
        />
        {isTagHelperOpen && <HyperTextModal />}
      </div>
      <div className="mt-4 mx-8 lg:mx-24">
        <Divider />
      </div>
    </header>
  );
}
